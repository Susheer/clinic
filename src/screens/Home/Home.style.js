import { StyleSheet } from 'react-native'
import * as theme from '../../constants/theme'

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 10,
    paddingHorizontal: 10
  },
  SafeAreaView1: { backgroundColor: theme.colors.lightWhite, flex: 0 },
  SafeAreaView2: {
    flex: 1,
    backgroundColor: theme.colors.lightWhite,
    height: 12
  },
  outerWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  buttonStyle: {
    backgroundColor: '#EEE',
    paddingHorizontal: 40,
    paddingVertical: 30,
    borderWidth: 0.5,
    borderColor: '#F0F0F0',
    borderRadius: 10
  },
  text: { fontSize: 18, color: '#808080', fontWeight: 'bold' },
  header: {
    padding: 20,
    flexDirection: 'row',
    backgroundColor: theme.colors.lightWhite,
    justifyContent: 'space-between',
    backgroundColor: 'red'
  },
  container: {
    backgroundColor: theme.colors.lightWhite
  },
  h4: {
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: theme.sizes.h4,
    color: theme.colors.black
  },
  title: {
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: theme.sizes.h6,
    color: theme.colors.black
  },
  searchContainer: {
    marginTop: 15,
    marginLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  addPatientContainer: {
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  addPatientIconContainer: {
    padding: 7,
    height: 30,
    marginLeft: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.lightBlack
  },
  searchInputContainer: {
    flex: 1,
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: theme.colors.white
  },
  searchIconContainer: {
    padding: 12,
    marginLeft: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.black
  },
  popularContainer: {
    paddingTop: 10
  },
  popularText: {
    marginBottom: 15,
    fontWeight: 'bold',
    fontSize: theme.sizes.h3,
    color: theme.colors.black
  }
})
