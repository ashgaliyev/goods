import store from '../configureStore'
import { updateState } from '../app/app'

//action types
export const SELECT = 'category/SELECT'
export const UPDATE_CATEGORIES = 'category/UPDATE_CATEGORIES'

//reducer
const initialState = {
  items: [],
  selectedId: null,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT: {
      return Object.assign({}, state, {
        selectedId: action.id,
      })
    }
    case UPDATE_CATEGORIES: {
      return Object.assign({}, state, {
        items: action.payload,
      })
    }
    default:
      return state
  }
}

//actions
export const selectCategory = id => {
  return function(dispatch) {
    dispatch({ type: SELECT, id })
  }
}

export const del = id => {
  return dispatch => {
    return fetch('/categories/' + id, {
      method: 'DELETE',
    })
      .then(res => console.log(res), error => console.log(error))
      .then(() => dispatch(updateState()))
  }
}
export const save = (id, name) => {
  return dispatch => {
    if (id === null) {
      return fetch('/categories', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })
        .then(res => console.log(res), error => console.log(error))
        .then(() => dispatch(updateState()))
    } else {
      return fetch('/categories/' + id, {
        method: 'PUT',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })
        .then(res => console.log(res), error => console.log(error))
        .then(() => dispatch(updateState()))
    }
  }
}
