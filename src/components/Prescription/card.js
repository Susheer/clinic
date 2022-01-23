import React, { useState } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  View,
  Text,
  Image
} from 'react-native'
import moment from 'moment'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import * as theme from '../../constants/theme'
import JobModal from '../jobModal'

const PrescriptionCard = ({
  createdAt,
  paidAmount,
  patinetId,
  prescription,
  prs_id,
  remainBalance,
  totalAmount,
  updateAt
}) => {
  const id = parseInt(prs_id)
  const [jobVisible, setJobVisible] = useState(false)

  const ToggleJobVisible = () => {
    setJobVisible(!jobVisible)
  }
  let formattedCreateAt = moment(createdAt).format('lll') //format('2022-01-23 22:37:44', 'yyyy-mm-dd hh:mm:ss')

  return (
    <TouchableOpacity
      onPress={() => ToggleJobVisible()}
      style={[styles.container, { color: theme.colors.white }]}>
      <Modal
        animationType="slide"
        visible={jobVisible}
        onRequestClose={() => ToggleJobVisible()}>
        <JobModal
          totalAmount={totalAmount}
          paidAmount={paidAmount}
          closeModal={() => ToggleJobVisible()}
        />
      </Modal>

      <View style={styles.header}>
        <FontIcon
          name="prescription"
          size={25}
          color={{ color: theme.colors.black }}
        />
        <Text style={[styles.jobSalary, { color: theme.colors.black }]}>
          {formattedCreateAt}
        </Text>
      </View>
      <Text style={[styles.jobTitle, { color: theme.colors.black }]}>
        Paid Amount: {paidAmount}
      </Text>
      <Text style={[styles.jobLocation, { color: theme.colors.black }]}>
        Total Amount: {totalAmount}
      </Text>
      <View style={styles.tagContainer}>
        <View
          style={[
            styles.tag,
            { marginRight: 8 },
            { backgroundColor: theme.colors.lightBlack }
          ]}>
          <Text
            style={[
              styles.jobLocation,
              { fontWeight: 'bold' },
              { color: theme.colors.white }
            ]}>
            View
          </Text>
        </View>
        <View
          style={[styles.tag, { backgroundColor: theme.colors.lightBlack }]}>
          <Text
            style={[
              styles.jobLocation,
              { fontWeight: 'bold' },
              { paddingBottom: 5 },
              { color: theme.colors.lightWhite }
            ]}>
            Download
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 165,
    padding: 20,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.black
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  jobSalary: {
    fontWeight: '900',
    fontSize: theme.sizes.h3
  },
  jobTitle: {
    marginTop: 10,
    fontWeight: '900',
    fontSize: theme.sizes.h3
  },
  jobLocation: {
    marginTop: 3,
    fontWeight: '900',
    fontSize: theme.sizes.h2
  },
  tagContainer: {
    flexDirection: 'row'
  },
  tag: {
    flex: 1,
    padding: 5,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center'
  }
})

export default PrescriptionCard
