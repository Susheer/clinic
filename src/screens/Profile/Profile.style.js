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
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.lightWhite
  },
  body: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor: theme.colors.lightWhite
  },
  popularContainer: {
    paddingTop: 20,
    paddingBottom: 20
  },
  popularText: {
    marginBottom: 15,
    fontWeight: 'bold',
    fontSize: theme.sizes.h3,
    color: theme.colors.black
  },
  titleContainer: {
    flexDirection: 'row'
  },
  titleTextContainer: {
    marginLeft: 10,
    justifyContent: 'space-between'
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: theme.sizes.h6,
    color: theme.colors.black
  },
  posText: {
    fontWeight: '900',
    fontSize: theme.sizes.h3,
    color: theme.colors.black
  },
  titleText: {
    paddingTop: 20,
    paddingBottom: 7,
    fontWeight: 'bold',
    fontSize: theme.sizes.h4,
    color: theme.colors.black
  },
  normalText: {
    paddingTop: 15,
    fontWeight: '900',
    fontSize: theme.sizes.h3,
    color: theme.colors.black
  }
})
