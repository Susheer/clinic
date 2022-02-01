import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  Dimensions
} from 'react-native'
import { HStack, VStack, Center, Box, Heading, Button } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import FontIcon from 'react-native-vector-icons/Fontisto'
import styles from './Profile.style'
import { useDatabase } from '../../context/DatabaseContext'
import AllergyComp from '../../components/AllergyComp'
import * as theme from '../../constants/theme'
import PrescriptionComp from '../../components/Prescription/card'

const Profile = ({ navigation }) => {
  const patientId = useSelector(state => state.userReducer.selectedPatientId)
  const [allergies, setAllergies] = useState([])
  const state = useSelector(state => state.userReducer)
  const [prescriptionList, setPrescriptionList] = useState([])
  const [user, setUser] = useState(undefined)
  const dbCTX = useDatabase()

  let maxHAllergies = 0
  let maxHPrescription = 0
  if (allergies.length && prescriptionList.length) {
    maxHPrescription = '56'
    maxHAllergies = '56'
  } else {
    if (allergies.length) {
      maxHAllergies = '56'
    } else {
      maxHAllergies = '32'
    }
    if (prescriptionList.length) {
      maxHPrescription = '56'
    } else {
      maxHPrescription = '32'
    }
  }

  const EmptyListMessage = ({ message, children }) => {
    return (
      <VStack height={'48'}>
        <Center mt={'7'}>
          <Text style={{ textAlign: 'center', fontSize: 15 }}>
            {message || 'Nothing to show'}
          </Text>
          <Center mt={'5'}>{children}</Center>
        </Center>
      </VStack>
    )
  }

  useEffect(() => {
    if (patientId === 0 || patientId) {
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
      dbCTX
        .getAllergies(patientId)
        .then(allergies => {
          setAllergies(allergies)
        })
        .catch(reason => {
          setUser([])
        })
      dbCTX.getPrescriptionById(patientId).then(res => {
        setPrescriptionList(res)
      })
    }
  }, [patientId])
  //  style={{ borderColor: 'red', borderWidth: 1 }}
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f9f9f9" />
      <Box height={3} width="full" />
      <VStack height="full" width="full">
        <HStack padding={3} space={'5/6'}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={30} color={theme.colors.black} />
          </TouchableOpacity>
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
        </HStack>
        <Center>
          <HStack ml={5} width={'sm'} space={4}>
            <Center>
              <Image
                style={{ width: 90, height: 90, borderRadius: 45 }}
                source={require('../../assets/images/user-avatar-male.png')}
              />
            </Center>

            <VStack space={1} mt={2} width={'56'}>
              <HStack>
                <Heading fontSize={'xl'}>{user?.name}</Heading>
                <VStack>
                  <Text style={{ fontSize: 15 }}>({user?.guardianName})</Text>
                </VStack>
              </HStack>
              <HStack space={1}>
                <Center ml={1}>
                  <FontIcon name="mobile-alt" size={15} />
                </Center>
                <Text>{user?.mobileNumber}</Text>
              </HStack>
              <HStack space={1}>
                <Center>
                  <Icon name="location" size={15} color={theme.colors.gray} />
                </Center>
                <Text>
                  {user?.address > 50
                    ? user?.address.substring(0, 50 - 3) + '...'
                    : user?.address}
                </Text>
              </HStack>
            </VStack>
          </HStack>
        </Center>
        {/* Allergies */}

        <Heading ml={4} size={'sm'} mt={5} mb={3}>
          Allergies/Past history
        </Heading>

        <HStack maxH={maxHAllergies}>
          <FlatList
            data={allergies}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.aId}
            ListEmptyComponent={
              <EmptyListMessage
                message={`No past Histroy / allergies reported `}>
                <Button
                  colorScheme="trueGray"
                  variant={'outline'}
                  onPress={() => {
                    setImmediate(() => navigation.navigate('Prescription', {}))
                  }}>
                  Click to Update if Any
                </Button>
              </EmptyListMessage>
            }
            renderItem={({ item }) => {
              const { updateAt, name } = item
              return <AllergyComp updatedAt={updateAt} name={name} />
            }}
          />
        </HStack>

        {/* Prescriptions */}
        <Heading ml={4} fontSize={'md'} mt={7} mb={2}>
          Prescriptions
        </Heading>
        <VStack maxH={maxHPrescription}>
          {prescriptionList.length ? (
            <FlatList
              data={prescriptionList}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
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
                  <View
                    style={{
                      width: Dimensions.get('screen').width - 20
                    }}>
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
                  </View>
                )
              }}
            />
          ) : (
            <EmptyListMessage message={`No Prescription found `}>
              <Button
                colorScheme="trueGray"
                variant={'outline'}
                onPress={() => {
                  setImmediate(() => navigation.navigate('Prescription', {}))
                }}>
                Add New Prescription
              </Button>
            </EmptyListMessage>
          )}
        </VStack>
      </VStack>
    </>
  )
}

export default Profile
