const initialState = {
  items: [
    { id: 1, categoryId: 1, name: 'BMW', purchasePrice: 1000, price: 2000 },
    { id: 2, categoryId: 2, name: 'McLaren', purchasePrice: 4343, price: 1000 },
    { id: 3, categoryId: 3, name: 'PC', purchasePrice: 500, price: 550 },
    { id: 4, categoryId: 4, name: 'Mac', purchasePrice: 9999, price: 77779 },
  ],
}

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
