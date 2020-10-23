import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './Reducers/productReducers'
import { cartReducer } from './Reducers/cartReducers'
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const initalState = {
  cart: {
    cartItems: cartItemsFromStorage
  }
}
const middleWares = [thunk]
const store = createStore(reducer, initalState, composeWithDevTools(applyMiddleware(...middleWares)))

export default store