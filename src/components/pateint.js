import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';

import * as theme from '../constants/theme';

const Patient = ({pateint, viewPatient}) => {
  const id = parseInt(pateint.id);
  return (
    <TouchableOpacity
      onPress={() => {
        viewPatient(pateint);
      }}>
      <View style={styles.container}>
        <Image
          source={{uri: pateint.profile_pic}}
          borderRadius={5}
          style={{width: 70, height: 60}}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{pateint.name}</Text>
          <Text style={styles.parentsNm}>{pateint.prents}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.parentsNm}>{pateint.mobile}</Text>
          <Text style={styles.parentsNm}>{pateint.gender}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 17,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  iconContainer: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: theme.sizes.h3,
    color: theme.colors.black,
  },
  parentsNm: {
    fontSize: theme.sizes.h2,
    color: theme.colors.silver,
  },
});

export default Patient;
