import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { Avatar } from 'native-base'
import * as theme from '../constants/theme'
import { firstChOfEachWord } from '../utils/NameBadge'

const Patient = ({ pateint, viewPatient }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        viewPatient(pateint.p_id)
      }}>
      <View style={styles.container}>
        <Avatar bg="gray.400">{firstChOfEachWord(pateint.name)}</Avatar>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{pateint.name}</Text>
          <Text style={styles.parentsNm}>{pateint.guardianName}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.parentsNm}>{pateint.mobileNumber}</Text>
          <Text style={styles.parentsNm}>{pateint.sex}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 17,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: theme.colors.white
  },
  textContainer: {
    flex: 1,
    marginLeft: 10
  },
  iconContainer: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    fontWeight: 'bold',
    fontSize: theme.sizes.h3,
    color: theme.colors.black
  },
  parentsNm: {
    fontSize: theme.sizes.h2,
    color: theme.colors.silver
  }
})

export default Patient
