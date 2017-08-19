import { updateState } from '../app/app'

//action types
export const UPDATE_PRODUCTS = 'products/UPDATE_PRODUCTS'
//reducer
const initialState = {
  items: [],
}

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PRODUCTS: {
      return Object.assign({}, state, {
        items: action.payload,
      })
    }
    default:
      return state
  }
}

export const del = id => {
  return dispatch => {
    return fetch('/products/' + id, {
      method: 'DELETE',
    })
      .then(res => console.log(res), error => console.log(error))
      .then(() => dispatch(updateState()))
  }
}

export const save = (id, category_id, name, purchasePrice, price) => {
  return dispatch => {
    if (id === null) {
      return fetch('/products', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          category_id,
          purchasePrice,
          price,
        }),
      })
        .then(res => console.log(res), error => console.log(error))
        .then(() => dispatch(updateState()))
    } else {
      return fetch('/products/' + id, {
        method: 'PUT',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          category_id,
          purchasePrice,
          price,
        }),
      })
        .then(res => console.log(res), error => console.log(error))
        .then(() => dispatch(updateState()))
    }
  }
}
