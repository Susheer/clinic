import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useToast, Center } from 'native-base'
import { styles } from './form.style'
import * as theme from '../../constants/theme'
import {
  submitForm,
  setAddPatientButtonClicked,
  clearFrom,
  canNotLeftEmpty,
  setrefPatientsList
} from './redux/actions'
import { addNewPatientList } from '../../stores/actions/user.action'
import { useDatabase } from '../../context/DatabaseContext'

export function Footer(props) {
  const toast = useToast()
  const dispatch = useDispatch()
  const ctx = useDatabase()
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

          if (!name) {
            dispatch(canNotLeftEmpty('Please enter patient name !'))
          } else if (!mobileNumber) {
            dispatch(canNotLeftEmpty('Please enter mobile number.'))
          } else if (!sex || sex === 'Sex') {
            dispatch(canNotLeftEmpty("Selecte patient's gender"))
          } else if (!address) {
            dispatch(
              canNotLeftEmpty("Enter patient's address before submitting.")
            )
          } else if (!guardianName) {
            canNotLeftEmpty("Fill patient's gaurdian's name.")
          } else {
            setImmediate(() => dispatch(addNewPatientList(data)))
            ctx
              .addPatient(
                name,
                healthId,
                mobileNumber,
                sex,
                'hkkk',
                guardianName
              )
              .then(res => {
                setImmediate(() => dispatch(setrefPatientsList(true)))
              })
              .then(res => {
                console.log('add patient err', res)
              })
              .catch(err => {
                console.log('add patient', err)
              })
            setImmediate(() => {
              toast.show({
                title: `Patient ${name} added !! `
              })
              dispatch(setAddPatientButtonClicked(false))
              dispatch(clearFrom(true))
            })
          }
        }}>
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

function validateEmpty(key, onEmpty) {
  return new Promise((resolve, reject) => {
    if (!key) {
      return reject(onEmpty)
    }
    return resolve(true)
  })
}
