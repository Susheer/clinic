import { ACTION_TYPE } from './actionType'
const initialState = {
  refPatientList: false
}

export const newPatientfrom = (state = initialState, action) => {
  const { payload } = action
  switch (action.type) {
    case ACTION_TYPE.REF_PATIENT_LIST:
      return { ...state, refPatientList: !state.refPatientList }
    default:
      return state
  }
}

export default newPatientfrom
