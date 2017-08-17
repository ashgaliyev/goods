//action types
export const SELECT = 'product/SELECT'
export const SAVE = 'product/SAVE'
export const DELETE = 'product/DELETE'

//reducer
const initialState = {
  items: [
    { id: 1, categoryId: 1, name: 'BMW', purchasePrice: 1000, price: 2000 },
    { id: 2, categoryId: 1, name: 'McLaren', purchasePrice: 4343, price: 1000 },
    { id: 3, categoryId: 2, name: 'PC', purchasePrice: 500, price: 550 },
    { id: 4, categoryId: 2, name: 'Mac', purchasePrice: 9999, price: 77779 },
    {
      id: 5,
      categoryId: null,
      name: 'Valenok',
      purchasePrice: 222,
      price: 334,
    },
  ],
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
          items: [
            ...state.items,
            {
              id: nextId(state),
              categoryId:
                action.categoryId !== null ? parseInt(action.categoryId) : null,
              name: action.name,
              purchasePrice: parseFloat(action.purchasePrice),
              price: parseFloat(action.price),
            },
          ],
        })
      }

      return Object.assign({}, state, {
        items: state.items.map(elem => {
          if (elem.id === action.id) {
            elem.name = action.name
            ;(elem.categoryId =
              action.categoryId !== null
                ? parseInt(action.categoryId)
                : null), (elem.purchasePrice = parseFloat(action.purchasePrice))
            elem.price = parseFloat(action.price)
          }
          return elem
        }),
      })
    }
    case DELETE: {
      return Object.assign({}, state, {
        items: state.items.filter(elem => elem.id !== action.id),
      })
    }
    default:
      return state
  }
}

export const save = (id, categoryId, name, purchasePrice, price) => ({
  type: SAVE,
  id,
  categoryId,
  name,
  purchasePrice,
  price,
})
export const del = id => ({ type: DELETE, id })
