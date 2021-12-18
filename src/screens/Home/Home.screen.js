import React, { useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Modal
} from 'react-native'

import styles from './Home.style'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect, useDispatch, useSelector } from 'react-redux'
import * as theme from '../../constants/theme'
import Pateint from '../../components/pateint'
import FilterModal from '../../components/filterPatient'
import AddPatientForm from '../../components/addPatient'
import { setAddPatientButtonClicked } from '../../components/addPatient/redux/actions'

const Home = ({ navigation, user }) => {
  const dispatch = useDispatch()
  const addPatient = useSelector(
    state => state.userformReducer.addNewPatientClicked
  )
  const users = useSelector(state => state.userReducer.users)
  const [filterVisible, setFilterVisible] = useState(false)
  const ToggleFilterVisible = () => {
    setFilterVisible(!filterVisible)
  }
  const onPressView = () => {
    navigation.navigate('Profile', {})
  }
  function SearchBar(params) {
    return (
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={30} color={theme.colors.silver} />
          <TextInput placeholder="Enter patient name" />
        </View>
        <TouchableOpacity
          style={styles.searchIconContainer}
          onPress={() => ToggleFilterVisible()}>
          <Icon name="filter" size={30} color={theme.colors.white} />
        </TouchableOpacity>
      </View>
    )
  }
  function Header(params) {
    return (
      <View style={[styles.addPatientContainer]}>
        <Text style={styles.h4}>Search</Text>
        <TouchableOpacity
          style={styles.addPatientIconContainer}
          onPress={() => dispatch(setAddPatientButtonClicked(!addPatient))}>
          <Text style={{ color: 'white', fontSize: 12 }}>Add Patient</Text>
        </TouchableOpacity>
      </View>
    )
  }
  function UserList(params) {
    return (
      <SafeAreaView
        style={styles.container}
        showsVerticalScrollIndicator={false}>
        <FlatList
          data={users}
          renderItem={({ item, index }) => {
            return (
              <Pateint key={index} pateint={item} viewPatient={onPressView} />
            )
          }}
        />
      </SafeAreaView>
    )
  }

  return (
    <>
      <Header />
      <SearchBar />
      <View style={[styles.popularContainer, { marginLeft: 20 }]}>
        <Text style={styles.popularText}>Quick result</Text>
      </View>
      <UserList />
      <Modal
        animationType="slide"
        visible={filterVisible}
        onRequestClose={() => ToggleFilterVisible()}>
        <FilterModal closeModal={() => ToggleFilterVisible()} />
      </Modal>
      <Modal
        animationType="fade"
        visible={addPatient}
        onRequestClose={() =>
          dispatch(setAddPatientButtonClicked(!addPatient))
        }>
        <AddPatientForm />
      </Modal>
    </>
  )
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.users
  }
}

export default connect(mapStateToProps, null)(Home)
