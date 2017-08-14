export const ADD = 'category/ADD'
export const UPDATE = 'category/UPDATE'
export const DELETE = 'category/DELETE'

const initialState = {
  items: [{ id: 1, name: 'Cars' }, { id: 2, name: 'Computers' }],
}

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
