import { combineReducers } from 'redux'
import userReducer from './user.reducer'
import { newPatientfrom } from '../../components/addPatient/redux'
//insert another reducers here to be combined

const reducers = combineReducers({
  userReducer,
  userformReducer: newPatientfrom
})

export default reducers
