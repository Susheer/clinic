import React from 'react'
import { useDispatch } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import * as theme from '../../constants/theme'
import { styles } from './form.style'
import { clearFrom } from './redux/actions'

export function Header(props) {
  const dispatch = useDispatch()
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={props.closeModal}>
        <Icon name="keyboard-arrow-left" size={30} color={theme.colors.black} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Add New Patient</Text>
      <TouchableOpacity
        onPress={() => {
          dispatch(clearFrom(true))
        }}>
        <Text style={{ color: theme.colors.gray }}>Clear</Text>
      </TouchableOpacity>
    </View>
  )
}
