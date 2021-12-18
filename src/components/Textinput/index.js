import React from 'react'
import { View, TextInput, ScrollView } from 'react-native'
import styles from './text.style'
export function CTextinput(props) {
  return (
    <View style={styles.inputText}>
      <TextInput {...props} />
    </View>
  )
}
