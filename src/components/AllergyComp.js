import React from 'react'
import { StyleSheet, View } from 'react-native'
import moment from 'moment'
import { HStack, VStack, Center, Box, Heading, Text } from 'native-base'
import * as theme from '../constants/theme'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function AllergyList({ updatedAt, name }) {
  let formattedCreateAt = moment(updatedAt).format('lll')
  return (
    <HStack space={2} ml={5} mb={3}>
      <Center>
        <Icon
          name="keyboard-arrow-right"
          size={20}
          color={theme.colors.black}
        />
      </Center>
      <Center>
        <View>
          <Text fontSize={'sm'}>{name}</Text>
          <Text fontSize={'xs'} font>
            Reported On {formattedCreateAt}
          </Text>
        </View>
      </Center>
    </HStack>
  )
}

const styles = StyleSheet.create({})
