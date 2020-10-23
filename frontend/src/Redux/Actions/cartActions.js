import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../types'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    debugger;
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