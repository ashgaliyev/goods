//action types
export const TOGGLE = 'category/TOGGLE'
export const RESET = 'category/RESET'
export const ADD = 'category/ADD'
export const SAVE = 'category/SAVE'
export const DELETE = 'category/DELETE'

//reducer
const initialState = {
  items: [{ id: 1, name: 'Cars' }, { id: 2, name: 'Computers' }],
  selectedId: [],
}

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE:
      return Object.assign({}, state, {
        selectedId:
          state.selectedId.indexOf(action.id) !== -1
            ? state.selectedId.filter(x => x !== action.id)
            : [...state.selectedId, action.id],
      })
    default:
      return state
  }
}

//actions
export const toggleCategory = id => ({ type: TOGGLE, id })
export const reset = () => ({ type: RESET })
export const save = (id, name) => ({ type: SAVE, id, name })

//selectors
export const getCategories = state => state.categories.items
