import 'react-native-gesture-handler'
import React from 'react'
import MainNavigation from './navigation/navigation'
import { Provider } from 'react-redux'
import { store } from './stores'
import { NativeBaseProvider } from 'native-base'

const App = () => {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    </NativeBaseProvider>
  )
}

export default App
