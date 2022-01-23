import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { VStack, Text, ScrollView } from 'native-base'
import { useToast } from 'native-base'
import * as theme from '../../constants/theme'
import { styles } from './form.style'
import { addNewPatientList } from '../../stores/actions/user.action'
import { setrefPatientsList } from './redux/actions'
import { CTextinput } from '../Textinput'
import { useDatabase } from '../../context/DatabaseContext'

const Prescription = props => {
  const dispatch = useDispatch()
  const ctx = useDatabase()
  const toast = useToast()
  const [prescription, setPrescription] = useState('')
  const [totalAmount, setTotalAmount] = useState()
  const [paidAmount, setPaidAmount] = useState()
  const [remainBalance, setRemainBalance] = useState()
  const [error_description, setErrorDescription] = useState('')
  const { onCloseForm } = props
  const clearForm = () => {
    setPrescription('')
    setTotalAmount(0)
    setPaidAmount(0)
    setRemainBalance(0)
    setErrorDescription('')
  }
  useEffect(() => {
    if (totalAmount) {
      let remain = totalAmount - paidAmount
      setRemainBalance(remain)
    }
  }, [paidAmount, totalAmount])
  const { p_id } = props
  let body = (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.body}>
        <CTextinput
          multiline
          style={{ textAlign: 'center' }}
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
              keyboardType="numeric"
              placeholder="Total amount"
              style={{ marginLeft: 10 }}
              defaultValue={convertString(totalAmount)}
              onChangeText={text => setTotalAmount(text)}
            />
          </View>
          <View style={[styles.col, { marginLeft: 5 }]}>
            <CTextinput
              keyboardType="numeric"
              placeholder="Amount paid"
              style={{ marginLeft: 10 }}
              defaultValue={convertString(paidAmount)}
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
            if (!prescription) {
              setErrorDescription('Prescription can be blank!')
            } else {
              ctx
                .addPrescription(
                  prescription,
                  totalAmount,
                  paidAmount,
                  remainBalance,
                  p_id
                )
                .then(res => {
                  props.onAdded()
                  // setImmediate(() => dispatch(setrefPatientsList(true)))
                })
                .catch(err => {
                  console.log('error in adding prescription', err)
                })
              setImmediate(() => {
                toast.show({
                  title: `Prescription added`
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
function convertString(number) {
  return number ? number.toString() : ''
}

export default Prescription
