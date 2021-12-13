import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  View,
  Text,
  Image,
} from 'react-native';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import * as theme from '../constants/theme';
import JobModal from './jobModal';

const Company = ({item}) => {
  const id = parseInt(item.id);
  const [jobVisible, setJobVisible] = useState(false);

  const ToggleJobVisible = () => {
    setJobVisible(!jobVisible);
  };
  return (
    <TouchableOpacity
      onPress={() => ToggleJobVisible()}
      style={[styles.container, {color: theme.colors.white}]}>
      <Modal
        animationType="slide"
        visible={jobVisible}
        onRequestClose={() => ToggleJobVisible()}>
        <JobModal closeModal={() => ToggleJobVisible()} item={item} />
      </Modal>

      <View style={styles.header}>
        <FontIcon
          name="prescription"
          size={25}
          color={{color: theme.colors.black}}
        />
        <Text style={[styles.jobSalary, {color: theme.colors.black}]}>
          {item.issuedDate}
        </Text>
      </View>
      <Text style={[styles.jobTitle, {color: theme.colors.black}]}>
        Paid Amount: {item.paid}
      </Text>
      <Text style={[styles.jobLocation, {color: theme.colors.black}]}>
        Total Amount: {item.total}
      </Text>
      <View style={styles.tagContainer}>
        <View
          style={[
            styles.tag,
            {marginRight: 8},
            {backgroundColor: theme.colors.lightBlack},
          ]}>
          <Text
            style={[
              styles.jobLocation,
              {fontWeight: 'bold'},
              {color: theme.colors.white},
            ]}>
            View
          </Text>
        </View>
        <View style={[styles.tag, {backgroundColor: theme.colors.lightBlack}]}>
          <Text
            style={[
              styles.jobLocation,
              {fontWeight: 'bold'},
              {paddingBottom: 5},
              {color: theme.colors.lightWhite},
            ]}>
            Download
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 165,
    width: 220,
    padding: 20,
    marginLeft: 20,
    marginRight: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: theme.colors.black,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  jobSalary: {
    fontWeight: '900',
    fontSize: theme.sizes.h3,
  },
  jobTitle: {
    marginTop: 10,
    fontWeight: '900',
    fontSize: theme.sizes.h3,
  },
  jobLocation: {
    marginTop: 3,
    fontWeight: '900',
    fontSize: theme.sizes.h2,
  },
  tagContainer: {
    flexDirection: 'row',
  },
  tag: {
    flex: 1,
    padding: 5,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default Company;
