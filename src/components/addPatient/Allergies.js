import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import { Icon, Box, VStack, HStack, Input, IconButton, Text } from 'native-base'

function AddAllergies(props) {
  const [inputValue, setInputValue] = React.useState('')
  const { onCreate, onDel, allergies } = props
  return (
    <Box w="100%" mt={3}>
      <VStack space={4}>
        <HStack space={2}>
          <Input
            flex={1}
            borderStyle={'solid'}
            onChangeText={v => setInputValue(v)}
            value={inputValue}
            placeholder="Add Allergy"
          />
          <IconButton
            colorScheme="trueGray"
            borderRadius="md"
            variant="outline"
            style={{ borderColor: 'black' }}
            icon={<Icon as={Feather} name="plus" size="md" color="black" />}
            onPress={() => {
              if (inputValue) {
                onCreate(inputValue)
                setInputValue('')
              }
            }}
          />
        </HStack>
        <VStack space={2}>
          {allergies.map((item, itemI) => (
            <HStack
              w="100%"
              justifyContent="space-between"
              alignItems="center"
              key={item + itemI.toString()}>
              <Text
                mx="2"
                _light={{
                  color: 'gray.400'
                }}
                _dark={{
                  color: 'gray.400'
                }}>
                {item}
              </Text>
              <IconButton
                size="sm"
                colorScheme="trueGray"
                icon={
                  <Icon
                    as={Entypo}
                    name="minus"
                    size="xs"
                    color="trueGray.400"
                  />
                }
                onPress={() => onDel(itemI)}
              />
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Box>
  )
}

export default AddAllergies
