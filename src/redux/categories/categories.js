//action types
export const SELECT = 'category/SELECT'
export const RESET = 'category/RESET'
export const SAVE = 'category/SAVE'
export const DELETE = 'category/DELETE'

//reducer
const initialState = {
  items: [{ id: 1, name: 'Cars' }, { id: 2, name: 'Computers' }],
  selectedId: [],
}

const nextId = state => {
  return (
    state.items.reduce((acc, elem) => (elem.id > acc ? elem.id : acc), 0) + 1
  )
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SAVE: {
      if (action.id === null) {
        return Object.assign({}, state, {
          items: [...state.items, { id: nextId(state), name: action.name }],
        })
      }

      return Object.assign({}, state, {
        items: state.items.map(elem => {
          if (elem.id === action.id) {
            elem.name = action.name
          }
          return elem
        }),
      })
    }
    case DELETE: {
      return Object.assign({}, state, {
        items: state.items.filter(x => x.id !== action.id),
      })
    }
    case SELECT:
      return Object.assign({}, state, {
        selectedId: action.id,
      })
    default:
      return state
  }
}

//actions
export const selectCategory = id => ({ type: SELECT, id })
export const save = (id, name) => ({ type: SAVE, id, name })
export const del = id => ({ type: DELETE, id })

//selectors
export const getCategories = state => state.categories.items
