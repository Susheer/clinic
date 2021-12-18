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
//import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect, useDispatch, useSelector } from 'react-redux'
import { fetchDataUser } from '../../stores/actions/user.action'
import * as theme from '../../constants/theme'
import * as company from '../../constants/patient'
import Pateint from '../../components/pateint'
import FilterModal from '../../components/filterPatient'
import AddPatientForm from '../../components/addPatient'
import { setAddPatientButtonClicked } from '../../components/addPatient/redux/actions'

const Home = ({ navigation, user }) => {
  const dispatch = useDispatch()
  const addPatient = useSelector(
    state => state.userformReducer.addNewPatientClicked
  )
  const [filterVisible, setFilterVisible] = useState(false)
  const ToggleFilterVisible = () => {
    setFilterVisible(!filterVisible)
  }
  const onPressView = () => {
    navigation.navigate('Profile', {})
  }
  function ListUser() {
    return user.map(data => {
      return (
        <View
          key={data.id}
          style={{
            borderBottomWidth: 1,
            borderColor: '#eee',
            padding: 1,
            marginTop: 10
          }}>
          <Text style={{ fontSize: 15 }}>
            {data.id}. {data.name}
          </Text>
        </View>
      )
    })
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
        <View
          style={[
            styles.popularContainer,
            { marginRight: 20, marginLeft: 20, marginBottom: 70 }
          ]}>
          <FlatList
            data={company.companies}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return <Pateint pateint={item} viewPatient={onPressView} />
            }}
          />
        </View>
      </SafeAreaView>
    )
  }

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.lightWhite}
      />
      <SafeAreaView style={styles.SafeAreaView1}>
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
      </SafeAreaView>
    </>
  )
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.users
  }
}

export default connect(mapStateToProps, null)(Home)
