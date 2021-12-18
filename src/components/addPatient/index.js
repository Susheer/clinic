import React from 'react'
import { View } from 'react-native'
import { styles } from './form.style'
import { Body } from './body'
import { Footer } from './footer'
import { Header } from './header'
const AddPatient = props => {
  return (
    <View style={styles.container}>
      <Header />
      <Body />
      <Footer />
    </View>
  )
}

export default AddPatient
