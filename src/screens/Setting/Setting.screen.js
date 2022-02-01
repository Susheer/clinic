import React from 'react'
import { VStack, Center, Button, Box, Heading } from 'native-base'
import { Text } from 'react-native'

const Setting = ({ navigation }) => {
  return (
    <Box alignSelf={'center'} height={'lg'} mt={12}>
      <Center>
        <Heading>settings screen</Heading>
      </Center>
      <Button
        onPress={() => {
          navigation.goBack()
        }}>
        Go back from settings
      </Button>
    </Box>
  )
}

export default Setting
