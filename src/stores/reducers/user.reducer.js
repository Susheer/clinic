import { Avatar } from 'react-native-elements'
import {
  FETCH_USER_REQUEST,
  FETCH_USER_FAILED,
  FETCH_USER_SUCCESS
} from '../constants/user.constants'

const initialState = {
  users: [
    {
      id: '1',
      company: 'Uber',
      profile_pic: '',
      name: 'Sudheer guta',
      salary: '$45K - $70K',
      prents: 'Sudheer gupta',
      time: 'Full Time',
      loc: 'Anywhere',
      gender: 'Male',
      mobile: '8948451168',
      opportunity:
        'Uber is looking for a Frontend Developer to join its fast growing team. This work will report to the Project Manager and work alongside the development team to help us grow our business.',
      responsabilities: {
        first:
          'Collaborate with a cross-functionnal team to develop throughtful design solutions that are beautiful and pixel-perfect.',
        second:
          'Create visualizations, site maps, user flows, wireframes, low- to hight-fidelity mockups and prototypes.'
      }
    }
  ],
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

    default:
      return state
  }
}

export default userReducer
