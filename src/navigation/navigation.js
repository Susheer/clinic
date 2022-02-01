import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Home from '../screens/Home/Home.screen'
import Profile from '../screens/Profile/Profile.screen'
import Setting from '../screens/Setting/Setting.screen'

import Prescription from '../screens/Prescription/Prescription.screen'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AddPatientForm from '../components/addPatient'
import { sqliteDatabase } from '../database/Database'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Text } from 'react-native'

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
            return <Icon name={'home'} size={25} color={color} />
          }
        }}
      />
      <Tab.Screen
        name="Add Patient"
        component={AddPatientForm}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return <Icon name={'person-add'} size={25} color={color} />
          }
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return <Icon name={'settings'} size={25} color={color} />
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
    console.log('props', props)
    sqliteDatabase
      .getPatientsList(10, 'DESC')
      .then(response => {
        // console.log('Apps lists', response)
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
          name="HomeMain"
          options={{ headerShown: false }}
          component={MyTabs}
        />
        <Stack.Screen
          name="Profile"
          options={{ headerShown: false }}
          component={Profile}
        />
        <Stack.Screen
          name="Prescription"
          options={{ headerShown: false }}
          component={Prescription}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation
