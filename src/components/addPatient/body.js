import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { VStack, Text } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { Picker } from '@react-native-community/picker'
import { styles } from './form.style'
import { CTextinput } from '../Textinput'
import {
  setAddress,
  setGuardianName,
  setMobileNumber,
  setName,
  setSex,
  sethealthId
} from './redux/actions'

export function Body(params) {
  const dispatch = useDispatch()
  const [distance, setDistance] = useState(0)
  const sex = useSelector(state => state.userformReducer.sex)
  const name = useSelector(state => state.userformReducer.name)
  const guardianName = useSelector(state => state.userformReducer.guardianName)
  const healthId = useSelector(state => state.userformReducer.healthId)
  const error_description = useSelector(
    state => state.userformReducer.error_description
  )
  const mobileNumber = useSelector(state => state.userformReducer.mobileNumber)
  const address = useSelector(state => state.userformReducer.address)
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.body}>
        <CTextinput
          placeholder="Name"
          defaultValue={name}
          onChangeText={text => dispatch(setName(text))}
        />
        <CTextinput
          placeholder="Guardian Name"
          defaultValue={guardianName}
          onChangeText={text => dispatch(setGuardianName(text))}
        />
        <CTextinput
          placeholder="Health id"
          defaultValue={healthId}
          onChangeText={text => dispatch(sethealthId(text))}
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
              onChangeText={text => dispatch(setMobileNumber(text))}
            />
          </View>
          <View style={[styles.col, { marginLeft: 5 }]}>
            <View style={styles.pickerContainer}>
              <Picker
                value={distance}
                selectedValue={sex}
                onValueChange={(itemValue, itemIndex) =>
                  dispatch(setSex(itemValue))
                }>
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
          onChangeText={text => dispatch(setAddress(text))}
          placeholder="Address"
        />
        <VStack space={1} alignItems="center" mt={3}>
          <Text fontSize="md" color={'red.500'}>
            {error_description}
          </Text>
        </VStack>
      </View>
    </ScrollView>
  )
}
