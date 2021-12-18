import { ACTION_TYPE } from './actionType'
export function clearFrom(flag) {
  return { type: ACTION_TYPE.CLEAR, payload: true }
}

export function submitForm(data) {
  // Add data to db
  return { type: ACTION_TYPE.Submit, payload: data }
}

export function setName(data) {
  return { type: ACTION_TYPE.SET_NAME, payload: data }
}
export function setSex(data) {
  return { type: ACTION_TYPE.SET_SEX, payload: data }
}
export function setGuardianName(data) {
  return { type: ACTION_TYPE.SET_GAURDIAN, payload: data }
}
export function sethealthId(data) {
  return { type: ACTION_TYPE.SET_HEALTH_ID, payload: data }
}

export function setMobileNumber(data) {
  return { type: ACTION_TYPE.SET_MOBILE_NUMBER, payload: data }
}

export function setAddress(data) {
  return { type: ACTION_TYPE.SET_ADDRESS, payload: data }
}

export function setAddPatientButtonClicked(boolean) {
  return { type: ACTION_TYPE.ADD_PATIENT_BUTTON_CLICKED, payload: boolean }
}
export function canNotLeftEmpty(error_description) {
  return {
    type: ACTION_TYPE.PATIENT_FORM_EMPTY,
    payload: error_description
  }
}
