import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react'
import { AppState } from 'react-native'
import MainNavigation from './navigation/navigation'
import { Provider, useDispatch } from 'react-redux'
import { store } from './stores'
import { DatabaseContext, useDatabase } from './context/DatabaseContext'
import { sqliteDatabase } from './database/Database'

import { NativeBaseProvider } from 'native-base'
let appState
const App = () => {
  // Initialize state
  const [isLoading, setIsLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('Loading...')
  // Read the initial value of AppState
  appState = AppState.currentState

  // Set up a callback to fire when AppState changes (when the app goes to/from the background)
  useEffect(function () {
    console.log('appState', appState)
    // The app is currently active, so the "change" event will not fire and we need to
    // call appIsNowRunningInForeground ourselves.
    appIsNowRunningInForeground()
    appState = 'active'
    // Listen for app state changes
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    )
    return function () {
      // Cleanup function
      subscription.remove()
    }
  }, [])
  // Function to run when the app is brought to the foreground
  async function appIsNowRunningInForeground() {
    console.log('App is now running in the foreground!')
    // Sync the database with Dropbox
    // const syncDatabase = useDatabaseSync(prepareForDatabaseUpdate)
    // syncDatabase()
  }
  // Handle the app going from foreground to background, and vice versa.
  function handleAppStateChange(nextAppState) {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      // App has moved from the background (or inactive) into the foreground
      appIsNowRunningInForeground()
    } else {
      console.log('App in->', nextAppState)
    }
    appState = nextAppState
  }
  // Function to call right before a DB update begins
  async function prepareForDatabaseUpdate() {
    setIsLoading(true)
    setLoadingText('Downloading database...')
  }
  function isReady() {
    return isLoading === false
  }
  if (isReady()) {
    return (
      <DatabaseContext.Provider value={sqliteDatabase}>
        <NativeBaseProvider>
          <Provider store={store}>
            <MainNavigation />
          </Provider>
        </NativeBaseProvider>
      </DatabaseContext.Provider>
    )
  } else {
    // Else, show a loading screen
    return <LoadingScreen text={loadingText} />
  }
}

export default App
