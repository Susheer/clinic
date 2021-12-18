import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { styles } from './form.style'
import * as theme from '../../constants/theme'
import {
  submitForm,
  setAddPatientButtonClicked,
  clearFrom
} from './redux/actions'
import { addNewPatientList } from '../../stores/actions/user.action'
export function Footer(props) {
  const dispatch = useDispatch()
  const { name, healthId, mobileNumber, sex, address, guardianName } =
    useSelector(state => state.userformReducer)
  return (
    <View style={{ padding: 20, backgroundColor: theme.colors.white }}>
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => {
          let data = {
            name,
            healthId,
            mobileNumber,
            sex,
            address,
            guardianName
          }
          dispatch(addNewPatientList(data))
          setImmediate(() => {
            dispatch(submitForm())
            dispatch(setAddPatientButtonClicked(false))
            dispatch(clearFrom(true))
          })
        }}>
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}
