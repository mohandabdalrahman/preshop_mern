import { CREATE_ORDER_REQUSET, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL } from '../types'
import axios from 'axios'

export const createOrder = (orderDate) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUSET })
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`
      }
    }
    const { data } = await axios.post('/api/orders', orderDate, config)
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}