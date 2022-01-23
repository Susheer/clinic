import { ACTION_TYPE } from './actionType'

export function setrefPatientsList(flag) {
  return {
    type: ACTION_TYPE.REF_PATIENT_LIST,
    payload: flag
  }
}
