import React, { Children, useEffect, useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal
} from 'react-native'
import styles from './Prescription.style'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect, useDispatch, useSelector } from 'react-redux'
import * as theme from '../../constants/theme'
import Pateint from '../../components/pateint'
import FilterModal from '../../components/filterPatient'
import PrescriptionForm from '../../components/Prescription'
import { setSelectedPatientId } from '../../stores/actions/user.action'
import PrescriptionComp from '../../components/Prescription/card'
import { useDatabase } from '../../context/DatabaseContext'

const Prescription = ({ navigation, user }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const patientId = useSelector(state => state.userReducer.selectedPatientId)
  const [addNewPatientFlg, setAddNewPatientFlg] = useState(false)
  const [filterVisible, setFilterVisible] = useState(false)
  const [refList, setRefreshList] = useState(false)

  const [prescriptionList, setPrescriptionList] = useState([])
  const dispatch = useDispatch()
  const dbContext = useDatabase()
  const ToggleFilterVisible = () => {
    setFilterVisible(!filterVisible)
  }

  const onPressView = id => {
    dispatch(setSelectedPatientId(id))
    setImmediate(() => navigation.navigate('Profile', {}))
  }

  useEffect(() => {
    dbContext.getPrescriptionById(patientId).then(res => {
      setPrescriptionList(res)
    })
  }, [refList])
  return (
    <>
      <SearchBar term={searchTerm} setTerm={setSearchTerm}>
        <TouchableOpacity
          style={styles.searchIconContainer}
          onPress={() => setAddNewPatientFlg(!addNewPatientFlg)}>
          <Icon name="add" size={30} color={theme.colors.white} />
        </TouchableOpacity>
      </SearchBar>
      <View style={[styles.popularContainer, { marginLeft: 20 }]}>
        <Text style={styles.popularText}>Prescription</Text>
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={prescriptionList}
          showsVerticalScrollIndicator
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.prs_id}
          renderItem={({ item }) => {
            if (!item) {
              return <Text>No Item</Text>
            }
            const {
              createdAt,
              paidAmount,
              patinetId,
              prescription,
              prs_id,
              remainBalance,
              totalAmount,
              updateAt
            } = item
            return (
              <TouchableOpacity activeOpacity={1} style={{ flex: 1 }}>
                <PrescriptionComp
                  createdAt={createdAt}
                  paidAmount={paidAmount}
                  patinetId={patinetId}
                  prescription={prescription}
                  id={prs_id}
                  remainBalance={remainBalance}
                  totalAmount={totalAmount}
                  updateAt={updateAt}
                />
              </TouchableOpacity>
            )
          }}
        />
      </SafeAreaView>
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
        <PrescriptionForm
          p_id={patientId}
          onAdded={() => setRefreshList(!refList)}
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

export default connect(mapStateToProps, null)(Prescription)

function SearchBar(props) {
  const { term, setTerm, children } = props
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        <Icon name="search" size={30} color={theme.colors.silver} />
        <TextInput
          placeholder="Search prescription"
          onChangeText={text => setTerm(text)}
          defaultValue={term}
        />
      </View>
      {children}
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
