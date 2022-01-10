/**
 * React Native SQLite Demo
 * Copyright (c) 2018-2020 Bruce Lefebvre <bruce@brucelefebvre.com>
 * https://github.com/blefebvre/react-native-sqlite-demo/blob/master/LICENSE
 */
import { Alert } from "react-native";
import RNRestart from "react-native-restart";
import { DropboxDatabaseSync } from "../sync/dropbox/DropboxDatabaseSync";
import { DropboxAuthorize } from "../sync/dropbox/DropboxAuthorize";

export type SynchronizerFunction = () => void;
export type PrepareForUpdateFunction = () => Promise<void>;

const dropboxSync = new DropboxDatabaseSync();
const dropboxAuth = new DropboxAuthorize();

// Hook to synchronize database changes with the copy that exists on Dropbox
export function useDatabaseSync(prepareForDatabaseUpdate: PrepareForUpdateFunction): SynchronizerFunction {
  async function reconcileDatabaseChanges(): Promise<void> {
    let anUpdateToTheDatabaseExists: boolean;

    // Has this database been synced yet?
    const hasBeenSynced = await dropboxSync.hasSynced();

    if (hasBeenSynced === false) {
      // the database has not been synced yet, so there is nothing to do.
      return;
    }

    // The database has been synced!
    // Proceed with checking for an update
    const updateExists = await dropboxSync.hasRemoteUpdate();

    // When updateExists === true, there has been an update made to the database file by another device.
    // We need to download it and replace our current database file with it, in order to have the latest
    // data available on this device.
    anUpdateToTheDatabaseExists = updateExists;

    // Was the last upload from this device completed successfully?
    // This will change the way we prompt the user, since we do not handle merging data.
    const wasLastUploadCompleted = await dropboxSync.hasLastUploadCompleted();

    console.log(
      `[DatabaseSynchronizer] Checking for an update to the database! wasLastUploadCompleted = ${wasLastUploadCompleted} and anUpdateToTheDatabaseExists = ${anUpdateToTheDatabaseExists}`,
    );

    try {
      // If the last upload WAS NOT completed, and an update to the database DOES NOT exist on dropbox:
      // We should complete the upload which previously failed.
      if (wasLastUploadCompleted === false && anUpdateToTheDatabaseExists === false) {
        console.log("[DatabaseSynchronizer] the local DB needs to be uploaded! Queuing an upload now.");

        return dropboxSync.upload();
      } else if (wasLastUploadCompleted && anUpdateToTheDatabaseExists === false) {
        // The last backup completed and NO update to the database exists on dropbox:
        // no-op!
        console.log("[DatabaseSynchronizer] the local DB is up-to-date with the Dropbox backup.");

        return Promise.resolve();
      } else if (wasLastUploadCompleted && anUpdateToTheDatabaseExists) {
        // The last upload completed and an update to the database DOES exist on dropbox:
        // We need to download it and replace our current database file with it, in order to
        // have the latest data available on this device.
        console.log(
          "[DatabaseSynchronizer] Update alert! There has been an update made to the DB file by another device.",
        );
        promptToUpdateDatabase();

        return Promise.resolve();
      } else if (wasLastUploadCompleted === false && anUpdateToTheDatabaseExists) {
        // !!! There have been changes made to both the local DB, which was not uploaded successfully,
        // and also to the Dropbox backup of the DB. In this case we are going to assume the Dropbox
        // copy contains the latest content, but we will show a different prompt to make the user aware
        // that their local database will be replaced. We'll give them the option to "unlink" as well.
        console.log(
          "[DatabaseSynchronizer] last backup WAS NOT completed AND there IS an update on Dropbox! Prompt to replace DB.",
        );
        promptToReplaceDatabase();

        return Promise.resolve();
      } else {
        console.error(
          `[DatabaseSynchronizer] ERROR: what state is this? wasLastUploadCompleted = ${wasLastUploadCompleted} anUpdateToTheDatabaseExists = ${anUpdateToTheDatabaseExists}`,
        );

        return Promise.resolve();
      }
    } catch (reason) {
      console.error("[DatabaseSynchronizer] error in reconcileDatabaseChanges():", reason);
    }
  }

  function promptToUpdateDatabase(): void {
    Alert.alert(
      "Update database?",
      "The synced database on Dropbox has changed since you last ran the app on this device.",
      [
        {
          text: "Apply update from Dropbox",
          onPress: () => downloadAndApplyUpdate(),
        },
        {
          text: "Cancel (unlink Dropbox)",
          onPress: () => dropboxAuth.revokeAuthorization(),
        },
      ],
      { cancelable: false },
    );
  }

  function promptToReplaceDatabase(): void {
    Alert.alert(
      "Replace local database?",
      "The synced database on Dropbox has changed since you last ran the app on this device. Would you like to overwrite the current database with the version on Dropbox?",
      [
        {
          text: "Yes, replace the current database",
          onPress: () => downloadAndApplyUpdate(),
        },
        {
          text: "Cancel (unlink Dropbox)",
          onPress: () => dropboxAuth.revokeAuthorization(),
        },
      ],
      { cancelable: false },
    );
  }

  function downloadAndApplyUpdate(): void {
    console.log("[DatabaseSynchronizer] User chose to apply the remote update.");
    // Perform update preparation
    prepareForDatabaseUpdate()
      .then(() => {
        return dropboxSync.download();
      })
      .then(() => {
        console.log("[DatabaseSynchronizer] DB download success! Reloading app.");
        RNRestart.Restart();
      })
      .catch((reason) => {
        console.error("[DatabaseSynchronizer] Error downloading Dropbox database copy. Reason:", reason);
        // TODO: present error, or reopen DB?
        // For now, reload the app bundle via RNRestart
        RNRestart.Restart();
      });
  }

  // This hook returns a single function which triggers a DB sync
  return function syncDatabase(): Promise<void> {
    console.log("syncDatabase is invoked");
    // Only attempt to sync when the device is online

    // TODO: need community NetInfo
    //return NetInfo.isConnected.fetch().then(isConnected => {
    return Promise.resolve(false).then((isConnected) => {
      if (isConnected) {
        console.log("[DatabaseSynchronizer] App is online! Check for an update.");
        return reconcileDatabaseChanges();
      }
      // else: no-op. Try again next time.
      // Enhancement: set up a NetInfo.addEventListener("connectionChange" ...) to handle when
      // this device's connectivity changes.
    });
  };
}
