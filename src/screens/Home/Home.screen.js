import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal
} from 'react-native'

import styles from './Home.style'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Box, VStack, HStack, ScrollView } from 'native-base'
import * as theme from '../../constants/theme'
import Pateint from '../../components/pateint'
import FilterModal from '../../components/filterPatient'
import AddPatientForm from '../../components/addPatient'
import { setSelectedPatientId } from '../../stores/actions/user.action'

const Home = ({ navigation, user }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()
  const [addNewPatientFlg, setAddNewPatientFlg] = useState(false)
  const users = useSelector(state => state.userReducer.users)
  const [filterVisible, setFilterVisible] = useState(false)

  const ToggleFilterVisible = () => {
    setFilterVisible(!filterVisible)
  }
  const onPressView = id => {
    dispatch(setSelectedPatientId(id))
    setImmediate(() => navigation.navigate('Profile', {}))
  }

  function Header(params) {
    return (
      <HStack space={150}>
        <Text style={styles.h4}>Search</Text>
        <View
          space={1}
          style={{ display: 'flex', justifyContent: 'flex-end', width: 100 }}>
          <TouchableOpacity
            style={styles.addPatientIconContainer}
            onPress={() => setAddNewPatientFlg(!addNewPatientFlg)}>
            <Text style={{ color: 'white', fontSize: 12 }}>Add Patient</Text>
          </TouchableOpacity>
        </View>
      </HStack>
    )
  }

  return (
    <>
      <Header />
      <SearchBar term={searchTerm} setTerm={setSearchTerm} />
      <View style={[styles.popularContainer, { marginLeft: 20 }]}>
        <Text style={styles.popularText}>Quick result</Text>
      </View>
      <UserList
        searchTerm={searchTerm}
        onPressView={onPressView}
        users={users}
      />
      <Modal
        animationType="slide"
        visible={filterVisible}
        onRequestClose={() => ToggleFilterVisible()}>
        <FilterModal closeModal={() => ToggleFilterVisible()} />
      </Modal>
      <Modal
        animationType="fade"
        visible={addNewPatientFlg}
        onRequestClose={() => setAddNewPatientFlg(!addNewPatientFlg)}>
        <AddPatientForm
          onCloseForm={() => setAddNewPatientFlg(!addNewPatientFlg)}
        />
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

function SearchBar(props) {
  const { term, setTerm } = props
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        <Icon name="search" size={30} color={theme.colors.silver} />
        <TextInput
          placeholder="Enter patient name"
          onChangeText={text => setTerm(text)}
          defaultValue={term}
        />
      </View>
      <TouchableOpacity
        style={styles.searchIconContainer}
        onPress={() => {
          //ToggleFilterVisible()
        }}>
        <Icon name="filter" size={30} color={theme.colors.white} />
      </TouchableOpacity>
    </View>
  )
}

function UserList(props) {
  const { users, searchTerm, onPressView } = props
  let data = []
  if (searchTerm && searchTerm !== '') {
    // apply filter on search term
    data = users.filter(item => item.name.toLowerCase().includes(searchTerm))
  } else {
    data = users
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          return (
            <Pateint key={index} pateint={item} viewPatient={onPressView} />
          )
        }}
      />
    </SafeAreaView>
  )
}
