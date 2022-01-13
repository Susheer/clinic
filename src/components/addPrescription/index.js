import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Picker } from '@react-native-community/picker'
import { VStack, Text, ScrollView } from 'native-base'
import { useToast } from 'native-base'
import * as theme from '../../constants/theme'
import { styles } from './form.style'
import { addNewPatientList } from '../../stores/actions/user.action'
import { setrefPatientsList } from './redux/actions'
import { CTextinput } from '../Textinput'
import { useDatabase } from '../../context/DatabaseContext'

const AddPatient = props => {
  const dispatch = useDispatch()
  const ctx = useDatabase()
  const toast = useToast()
  const [prescription, setPrescription] = useState('')
  const [totalAmount, setTotalAmount] = useState(0)
  const [paidAmount, setPaidAmount] = useState(0)
  const [remainBalance, setRemainBalance] = useState(0)
  const [error_description, setErrorDescription] = useState('')
  const { onCloseForm } = props
  const clearForm = () => {
    setPrescription('')
    setTotalAmount('')
    setPaidAmount('')
    setRemainBalance('')
    setErrorDescription('')
  }
  useEffect(() => {
    if (totalAmount) {
      let remain = totalAmount - paidAmount
      setRemainBalance(remain)
    }
  }, [paidAmount, totalAmount])
  let body = (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.body}>
        <CTextinput
          multiline
          style={{ texAlign: 'center' }}
          numberOfLines={14}
          defaultValue={prescription}
          onChangeText={text => setPrescription(text)}
          placeholder="Write prescription here"
        />
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row'
          }}>
          <View style={[styles.col, { flex: 2 }]}>
            <CTextinput
              placeholder="Total amount"
              style={{ marginLeft: 10 }}
              keyboardType="decimal-pad"
              defaultValue={totalAmount}
              onChangeText={text => setTotalAmount(text)}
            />
          </View>
          <View style={[styles.col, { marginLeft: 5 }]}>
            <CTextinput
              keyboardType="decimal-pad"
              placeholder="Amount paid"
              style={{ marginLeft: 10 }}
              defaultValue={paidAmount}
              onChangeText={value => {
                setPaidAmount(value)
              }}
            />
          </View>
        </View>
        {remainBalance ? (
          <VStack space={1} alignItems="center" mt={3}>
            <Text fontSize="md" color={'black'}>
              Remaining balance: {remainBalance}
            </Text>
          </VStack>
        ) : null}

        <VStack space={1} alignItems="center" mt={3}>
          <Text fontSize="md" color={'red.500'}>
            {error_description}
          </Text>
        </VStack>
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
        <Text style={styles.headerTitle}>New Prescription</Text>
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
                })
                .then(res => {
                  console.log('add patient err', res)
                })
                .catch(err => {
                  console.log('add patient', err)
                })
              setImmediate(() => {
                toast.show({
                  title: `Patient ${name} added !! `
                })
                clearForm()
                onCloseForm()
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
