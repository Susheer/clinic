import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { styles } from './form.style'
import * as theme from '../../constants/theme'
import { submitForm, setAddPatientButtonClicked } from './redux/actions'
export function Footer(props) {
  const dispatch = useDispatch()
  return (
    <View style={{ padding: 20, backgroundColor: theme.colors.white }}>
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => {
          dispatch(submitForm())
          dispatch(setAddPatientButtonClicked(false))
        }}>
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}
