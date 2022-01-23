import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  SafeAreaView
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import FontIcon from 'react-native-vector-icons/Fontisto'
import styles from './Profile.style'
import { useDatabase } from '../../context/DatabaseContext'
import Experience from '../../components/Experience'
import * as theme from '../../constants/theme'
import PrescriptionComp from '../../components/Prescription/card'

const allergies = [
  {
    id: '1',
    updatedAt: '10th,Jan 2018',
    name: 'A red, itchy rash'
  }
]
const Edu = [
  {
    id: '1',
    institute: 'Khaled Ben Walid High School',
    start: 'Jan 2018',
    end: 'Feb 2018',
    diploma: 'Computer Sciences'
  },
  {
    id: '2',
    institute: 'ISET Charguia',
    start: 'Sep 2017',
    end: 'Jun 2020',
    diploma: 'Computer Technologies'
  }
]
const Profile = ({ navigation }) => {
  const patientId = useSelector(state => state.userReducer.selectedPatientId)
  const state = useSelector(state => state.userReducer)
  const [prescriptionList, setPrescriptionList] = useState([])
  const [user, setUser] = useState(undefined)
  const dbCTX = useDatabase()
  useEffect(() => {
    if (patientId) {
      dbCTX
        .getPatientById(patientId)
        .then(user => {
          setUser(user)
        })
        .catch(reason => {
          setUser(null)
          console.debug('Error', reason)
        })
      dbCTX.getPrescriptionById(patientId).then(res => {
        setPrescriptionList(res)
      })
    }
  }, [patientId])
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#f9f9f9'} />
      <SafeAreaView style={styles.SafeAreaView1} />
      <SafeAreaView style={styles.SafeAreaView2}>
        <View style={{ flex: 1 }}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={30} color={theme.colors.black} />
            </TouchableOpacity>
            <View>
              <TouchableOpacity
                style={styles.addPatientIconContainer}
                onPress={() => {
                  setImmediate(() => navigation.navigate('Prescription', {}))
                }}>
                <FontIcon
                  name="prescription"
                  size={25}
                  color={theme.colors.black}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Body */}

          <View
            style={[styles.body, { flexGrow: 1 }]}
            nestedScrollEnabled={true}>
            <View style={styles.titleContainer}>
              <Image
                style={{ width: 100, height: 100, borderRadius: 10 }}
                source={require('../../images/Blaiti.jpg')}
              />
              <View style={styles.titleTextContainer}>
                <Text style={styles.nameText}>{user?.name}</Text>
                <Text style={styles.posText}>{user?.guardianName}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontIcon
                    name="mobile-alt"
                    size={20}
                    color={theme.colors.gray}
                  />
                  <Text
                    style={[
                      styles.posText,
                      { color: theme.colors.gray, marginLeft: 10 }
                    ]}>
                    {user?.mobileNumber}
                  </Text>
                </View>
              </View>
            </View>

            {/* Description */}
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                paddingTop: 8
              }}>
              <View style={{ marginLeft: 19 }}>
                <Icon name="location" size={20} color={theme.colors.gray} />
              </View>

              <View style={{ flexDirection: 'row', marginRight: 28 }}>
                <Text
                  style={[
                    styles.normalText,
                    {
                      paddingTop: 0,
                      fontSize: 14,
                      textTransform: 'capitalize',
                      flex: 1,
                      paddingRight: 12,
                      flexWrap: 'wrap'
                    }
                  ]}>
                  {user?.address}
                </Text>
              </View>
            </View>
            {/* Allergies */}
            <Text style={styles.titleText}>Allergies</Text>
            <SafeAreaView style={{ flex: 1 }}>
              <FlatList
                data={allergies}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                  return <Experience item={item} />
                }}
              />
            </SafeAreaView>

            {/* Popular Companies */}
            <View style={styles.popularContainer}>
              <Text style={[styles.popularText, { marginLeft: 20 }]}>
                Prescriptions
              </Text>
              <FlatList
                data={prescriptionList}
                horizontal
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
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}

export default Profile
