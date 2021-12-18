import { ACTION_TYPE } from './actionType'
const initialState = {
  wipeFlag: false,
  isSubmitClicked: false,
  name: '',
  healthId: '',
  mobileNumber: '',
  sex: 'Sex',
  address: '',
  guardianName: ''
}

export const newPatientfrom = (state = initialState, action) => {
  const { payload } = action
  switch (action.type) {
    case ACTION_TYPE.Submit:
      return {
        ...state,
        form: payload
      }
    case ACTION_TYPE.CLEAR:
      return {
        ...state,
        name: '',
        healthId: '',
        mobileNumber: '',
        sex: 'Sex',
        address: '',
        guardianName: ''
      }
    case ACTION_TYPE.SET_NAME:
      return {
        ...state,
        name: payload
      }
    case ACTION_TYPE.SET_SEX:
      return {
        ...state,
        sex: payload
      }
    case ACTION_TYPE.SET_ADDRESS:
      return {
        ...state,
        gender: payload
      }
    case ACTION_TYPE.SET_GAURDIAN:
      return {
        ...state,
        guardianName: payload
      }
    case ACTION_TYPE.SET_HEALTH_ID:
      return {
        ...state,
        healthId: payload
      }
    case ACTION_TYPE.SET_MOBILE_NUMBER:
      return {
        ...state,
        mobileNumber: payload
      }
    default:
      return state
  }
}

export default newPatientfrom
