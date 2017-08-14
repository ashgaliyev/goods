import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import goods from './goods'

export default function(initialState = {}) {
  const rootReducer = combineReducers({
    goods,
  })

  return createStore(rootReducer, initialState, applyMiddleware(thunk))
}
