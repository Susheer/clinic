import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import { Picker } from '@react-native-community/picker'
import { useToast, Text, ScrollView } from 'native-base'
import * as theme from '../../constants/theme'
import { styles } from './form.style'
import { addNewPatientList } from '../../stores/actions/user.action'
import { setrefPatientsList } from './redux/actions'
import { CTextinput } from '../Textinput'
import AddAllergies from './Allergies'
import { useDatabase } from '../../context/DatabaseContext'

const AddPatient = props => {
  const dispatch = useDispatch()
  const ctx = useDatabase()
  const toast = useToast()
  const [distance] = useState(0)
  const [sex, setSex] = useState('Sex')
  const [name, setName] = useState('')
  const [guardianName, setGuardianName] = useState('')
  const [healthId, sethealthId] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [address, setAddress] = useState('')
  const [allergies, setAllergies] = useState([])
  const [error_description, setErrorDescription] = useState('')
  const { onCloseForm } = props
  const clearForm = () => {
    setSex('Sex')
    setName('')
    setGuardianName('')
    sethealthId('')
    setMobileNumber('')
    setAddress('')
    setErrorDescription('')
  }
  const addAllergies = title => {
    setAllergies([...allergies, title])
  }
  const delAllergie = index => {
    const temp = allergies.filter((_, itemI) => itemI !== index)
    setAllergies(temp)
  }

  let body = (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.body}>
        <CTextinput
          placeholder="Name"
          value={name}
          onChangeText={text => setName(text)}
        />
        <CTextinput
          placeholder="Guardian Name"
          defaultValue={guardianName}
          onChangeText={text => setGuardianName(text)}
        />
        <CTextinput
          placeholder="Health id"
          defaultValue={healthId}
          onChangeText={text => sethealthId(text)}
        />
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
          <View style={[styles.col, { flex: 2 }]}>
            <CTextinput
              placeholder="Mobile number"
              style={{ marginLeft: 10 }}
              defaultValue={mobileNumber}
              onChangeText={text => setMobileNumber(text)}
            />
          </View>
          <View style={[styles.col, { marginLeft: 5 }]}>
            <View style={styles.pickerContainer}>
              <Picker
                value={distance}
                selectedValue={sex}
                onValueChange={(itemValue, itemIndex) => setSex(itemValue)}>
                <Picker.Item label="Sex" value="Sex" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Femal" value="Femal" />
              </Picker>
            </View>
          </View>
        </View>
        <CTextinput
          multiline
          numberOfLines={4}
          defaultValue={address}
          onChangeText={text => setAddress(text)}
          placeholder="Address"
        />
        <AddAllergies
          allergies={allergies}
          onCreate={addAllergies}
          onDel={delAllergie}
        />
      </View>
    </ScrollView>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onCloseForm}>
          <Icon
            name="keyboard-arrow-left"
            size={30}
            color={theme.colors.black}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Patient</Text>
        <TouchableOpacity onPress={clearForm}>
          <Text style={{ color: theme.colors.gray }}>Clear</Text>
        </TouchableOpacity>
      </View>

      {body}
      <View style={{ padding: 20, backgroundColor: theme.colors.white }}>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => {
            let data = {
              name,
              healthId,
              mobileNumber,
              sex,
              address,
              guardianName
            }

            if (!name) {
              setErrorDescription('Please enter patient name !')
            } else if (!mobileNumber) {
              setErrorDescription('Please enter mobile number.')
            } else if (!sex || sex === 'Sex') {
              setErrorDescription("Selecte patient's gender")
            } else if (!address) {
              setErrorDescription("Enter patient's address before submitting.")
            } else if (!guardianName) {
              setErrorDescription("Fill patient's gaurdian's name.")
            } else {
              setImmediate(() => dispatch(addNewPatientList(data)))
              ctx
                .addPatient(
                  name,
                  healthId,
                  mobileNumber,
                  sex,
                  address,
                  guardianName
                )
                .then(res => {
                  setImmediate(() => dispatch(setrefPatientsList(true)))
                  return res
                })
                .then(patientId => {
                  console.log('adding allergies', allergies)
                  if (allergies.length) {
                    ctx
                      .addAllergy(allergies, patientId)
                      .then(success => {
                        setImmediate(() => {
                          toast.show({
                            title: `Patient ${name} added !! `
                          })
                          clearForm()
                          onCloseForm()
                        })
                      })
                      .catch(reason => {
                        // @todo delete patient here
                        console.log('Alergies failed', reason)
                      })
                  } else {
                    setImmediate(() => {
                      toast.show({
                        title: `Patient ${name} added !! `
                      })
                      clearForm()
                      onCloseForm()
                    })
                  }
                })
                .catch(err => {
                  console.log('add patient', err)
                })
            }
          }}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddPatient
