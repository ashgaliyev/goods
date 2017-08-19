import { UPDATE_CATEGORIES } from '../categories/categories'
import { UPDATE_PRODUCTS } from '../products/products'
export const UPDATE_STATE_REQUEST = 'app/UPDATE_STATE_REQUEST'
export const UPDATE_STATE_SUCCESS = 'app/UPDATE_STATE_SUCCESS'
export const UPDATE_STATE_FAILURE = 'app/UPDATE_STATE_FAILURE'

const initialState = {
  updating: false,
}

export default function(state = {}, action) {
  switch (action.type) {
    case UPDATE_STATE_REQUEST: {
      return { updating: true }
    }
    case UPDATE_STATE_SUCCESS: {
      return { updating: false }
    }
    case UPDATE_STATE_FAILURE: {
      return { updating: false }
    }
    default:
      return state
  }
}

export const updateState = () => {
  return function(dispatch) {
    dispatch({ type: UPDATE_STATE_REQUEST })
    return fetch('/update-state')
      .then(res => res.json(), err => dispatch({ type: UPDATE_STATE_FAILURE }))
      .then(json => {
        dispatch({ type: UPDATE_STATE_SUCCESS })
        dispatch({ type: UPDATE_CATEGORIES, payload: json.categories_items })
        dispatch({ type: UPDATE_PRODUCTS, payload: json.products_items })
      })
  }
}
