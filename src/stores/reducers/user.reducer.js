import { Avatar } from 'react-native-elements'
import {
  FETCH_USER_REQUEST,
  FETCH_USER_FAILED,
  FETCH_USER_SUCCESS,
  ADD_NEW_PATIENT
} from '../constants/user.constants'

const initialState = {
  users: [],
  isLoading: false
}

export const userReducer = (state = initialState, action) => {
  const { payload } = action
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        isLoading: true
      }

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        users: payload,
        isLoading: false
      }
    case FETCH_USER_FAILED:
      return {
        ...state,
        isLoading: false
      }
    case ADD_NEW_PATIENT:
      return {
        ...state,
        users: [...state.users, payload]
      }

    default:
      return state
  }
}

export default userReducer
