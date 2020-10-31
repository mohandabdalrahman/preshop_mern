import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from '../types'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        ...data,
        product: data._id,
        qty
      }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  } catch (error) {
    console.log('addToCart -> error', error)
  }
}

export const deleteFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}


export const saveShippingAddress = (shippingInfo) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: shippingInfo
  })
  localStorage.setItem('shippingAddress', JSON.stringify(shippingInfo))

}


export const savePaymentMethod = (paymentInfo) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: paymentInfo
  })
  localStorage.setItem('paymentMethod', JSON.stringify(paymentInfo))

}