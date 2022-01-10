import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Home from '../screens/Home/Home.screen'
import Profile from '../screens/Profile/Profile.screen'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { fetchUserSuccess } from '../stores/actions/user.action'
import { sqliteDatabase } from '../database/Database'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return <Icon name={'ios-home'} size={25} color={color} />
          }
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return <Icon name={'ios-settings'} size={25} color={color} />
          }
        }}
      />
    </Tab.Navigator>
  )
}

const MainNavigation = props => {
  const dispatch = useDispatch()
  const { refPatientList } = useSelector(state => state.userformReducer)
  useEffect(() => {
    sqliteDatabase
      .getPatientsList(10, 'DESC')
      .then(response => {
        console.log('Apps lists', response)
        dispatch({ type: 'FETCH_USER_SUCCESS', payload: response })
      })
      .catch(error => {
        console.log('[Apps] Failed in loading patient list from db', error)
      })
  }, [refPatientList])
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={Home}
        />
        <Stack.Screen
          name="Profile"
          options={{ headerShown: false }}
          component={Profile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation
