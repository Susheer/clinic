import { getUser } from '../../api/fakeApiUser'
import {
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED,
  FETCH_USER_REQUEST,
  ADD_NEW_PATIENT,
  SELECTED_PATIENT_ID
} from '../constants/user.constants'

export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST
  }
}

export const fetchUserSuccess = users => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: users
  }
}

export const fetchUserFail = () => {
  return {
    type: FETCH_USER_FAILED
  }
}

export const fetchDataUser = () => async dispatch => {
  try {
    dispatch(fetchUserRequest())
    const { data } = await getUser()
    dispatch(fetchUserSuccess(data))
  } catch (error) {
    dispatch(fetchUserFail())
  }
}

export const addNewPatientList = patient => {
  return { type: ADD_NEW_PATIENT, payload: patient }
}
export const setSelectedPatientId = p_id => {
  return { type: SELECTED_PATIENT_ID, payload: p_id }
}
