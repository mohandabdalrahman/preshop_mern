import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './Reducers/productReducers'
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer
})
const initalState = {}
const middleWares = [thunk]
const store = createStore(reducer, initalState, composeWithDevTools(applyMiddleware(...middleWares)))

export default store