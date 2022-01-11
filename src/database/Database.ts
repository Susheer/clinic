/**
 * Clinic
 * Copyright (c) 2021-2025 Sudheer gupta 
 */
import SQLite from "react-native-sqlite-storage";
import { DatabaseInitialization } from "./DatabaseInitialization";
import { Patient,Sex } from "../types/Patient";
import { Order } from "../types/Order";
import { DATABASE } from "./Constants";
import { DropboxDatabaseSync } from "../sync/dropbox/DropboxDatabaseSync";
import { AppState, AppStateStatus } from "react-native";

export interface Database {
  // Create
  addPatient(name: string, healthId: string, mobileNumber: string, sex: string, address: string, guardianName: string): Promise<void>;
  // Read
  getPatientsList(limit:number,orderby:Order): Promise<Patient[]>;
}

let databaseInstance: SQLite.SQLiteDatabase | undefined;
const databaseSync: DropboxDatabaseSync = new DropboxDatabaseSync();

// Insert a new patient into the database
async function addPatient(name: string, healthId: string, mobileNumber: string, sex: string, address: string, guardianName: string): Promise<void> {
  return getDatabase()
    .then((db) => db.executeSql("INSERT INTO Patient (name,healthId,mobileNumber,sex,address,guardianName) VALUES (?,?,?,?,?,?);", [name,healthId,mobileNumber,sex,address,guardianName]))
    .then(([results]) => {
      // Queue database upload
      return Promise.resolve() // databaseSync.upload();
    });
}

// Get an array of all the patinets in database
async function getPatientsList(limit:number,orderby:Order=Order.asc) {
  console.log("[db] Fetching patients list from the db...");
  return getDatabase()
    .then((db) =>
      // Get all the lists, ordered by newest lists first
      db.executeSql(`SELECT * FROM Patient ORDER BY p_id ${orderby}`),
    )
    .then(([results]) => {
      if (results === undefined) {
        return [];
      }
      const count = results.rows.length;
      const lists: Patient[] = [];
      for (let i = 0; i < count; i++) {
        const row:Patient = results.rows.item(i);
         const {  p_id } = row;
        console.log(`[db] Patients id: ${p_id}`);
        const record=Object.assign({}, row);
        lists.push(record);
      }
      return lists;
    });
}
// "Private" helpers

async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (databaseInstance !== undefined) {
    return Promise.resolve(databaseInstance);
  }
  // otherwise: open the database first
  return open();
}

// Open a connection to the database
async function open(): Promise<SQLite.SQLiteDatabase> {
  SQLite.DEBUG(true);
  SQLite.enablePromise(true);

  if (databaseInstance) {
    console.log("[db] Database is already open: returning the existing instance");
    return databaseInstance;
  }


  // Otherwise, create a new instance
  const db = await SQLite.openDatabase({ name: DATABASE.FILE_NAME,location:'default'});
  console.log("[db] Database open!");

  // Perform any database initialization or updates, if needed
  const databaseInitialization = new DatabaseInitialization();
  await databaseInitialization.updateDatabaseTables(db);
  databaseInstance = db;
  return db;
}

// Close the connection to the database
async function close(): Promise<void> {
  if (databaseInstance === undefined) {
    console.log("[db] No need to close DB again - it's already closed");
    return;
  }
  const status = await databaseInstance.close();
  console.log("[db] Database closed.");
  databaseInstance = undefined;
}

// Listen to app state changes. Close the database when the app is put into the background (or enters the "inactive" state)
let appState = "active";
console.log("[db] Adding listener to handle app state changes");
AppState.addEventListener("change", handleAppStateChange);

// Handle the app going from foreground to background, and vice versa.
function handleAppStateChange(nextAppState: AppStateStatus) {
  if (appState === "active" && nextAppState.match(/inactive|background/)) {
    // App has moved from the foreground into the background (or become inactive)
    console.log("[db] App has gone to the background - closing DB connection.");
    close();
  }
  appState = nextAppState;
}

// Export the functions which fulfill the Database interface contract
export const sqliteDatabase: Database = {
  addPatient,
  getPatientsList,
};
