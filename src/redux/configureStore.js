import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import categories from './categories'
import products from './products'
import logger from 'redux-logger'
import app from './app/app'

export default function(initialState = {}) {
  const rootReducer = combineReducers({
    app,
    products,
    categories,
  })

  return createStore(rootReducer, initialState, applyMiddleware(thunk, logger))
}
