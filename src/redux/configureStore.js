import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import categories from './categories'
import products from './products'

export default function(initialState = {}) {
  const rootReducer = combineReducers({
    products,
    categories,
  })

  return createStore(rootReducer, initialState, applyMiddleware(thunk))
}
