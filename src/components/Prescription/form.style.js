import { StyleSheet } from 'react-native'
import * as theme from '../../constants/theme'
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white
  },
  col: {
    flex: 1
  },
  header: {
    height: 70,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.lightWhite
  },
  headerTitle: {
    fontWeight: 'bold',
    alignItems: 'center',
    fontSize: theme.sizes.h4
  },
  body: {
    flex: 1,
    padding: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: theme.colors.white
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: theme.sizes.h3
  },
  searchInputContainer: {
    flex: 1,
    borderColor: theme.colors.black,
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row'
  },
  pickerContainer: {
    marginTop: 9,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.black
  },
  normalText: {
    fontWeight: '900',
    fontSize: theme.sizes.h3,
    color: theme.colors.black
  },
  locationInputContainer: {
    marginTop: 10,
    paddingLeft: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.black,
    alignItems: 'center',
    flexDirection: 'row'
  },
  btnContainer: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.black
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: theme.sizes.h4,
    color: theme.colors.white
  }
})
