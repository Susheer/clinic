import { ACTION_TYPE } from './actionType'
const initialState = {
  addNewPatientClicked: false,
  isSubmitClicked: false,
  name: '',
  healthId: '',
  mobileNumber: '',
  sex: 'Sex',
  address: '',
  guardianName: '',
  error_description: '',
  refPatientList: false
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
        guardianName: '',
        error_description: ''
      }
    case ACTION_TYPE.SET_NAME:
      return {
        ...state,
        name: payload,
        error_description: ''
      }
    case ACTION_TYPE.SET_SEX:
      return {
        ...state,
        sex: payload,
        error_description: ''
      }
    case ACTION_TYPE.SET_ADDRESS:
      return {
        ...state,
        address: payload,
        error_description: ''
      }
    case ACTION_TYPE.SET_GAURDIAN:
      return {
        ...state,
        guardianName: payload,
        error_description: ''
      }
    case ACTION_TYPE.SET_HEALTH_ID:
      return {
        ...state,
        healthId: payload,
        error_description: ''
      }
    case ACTION_TYPE.SET_MOBILE_NUMBER:
      return {
        ...state,
        mobileNumber: payload,
        error_description: ''
      }
    case ACTION_TYPE.ADD_PATIENT_BUTTON_CLICKED:
      return {
        ...state,
        addNewPatientClicked: payload
      }
    case ACTION_TYPE.REF_PATIENT_LIST:
      return { ...state, refPatientList: !state.refPatientList }
    case ACTION_TYPE.PATIENT_FORM_EMPTY:
      return {
        ...state,
        error_description: payload
      }
    default:
      return state
  }
}

export default newPatientfrom
