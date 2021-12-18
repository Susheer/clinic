import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'remote-redux-devtools'
import AsyncStorage from '@react-native-async-storage/async-storage'
import reducers from './reducers'

let composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const composeEnhancers = composeWithDevTools({
  realtime: true,
  port: 8000,
  hostname: '192.168.29.94'
})

export const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: []
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(thunk), composeEnhancers())
)

export const persistore = persistStore(store)
