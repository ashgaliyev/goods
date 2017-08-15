import { expect } from 'chai'
import reducer, { TOGGLE, toggleCategory, RESET, reset } from './categories'

describe('redux: categories', () => {
  it('works', () => {
    expect(true).to.be.true
  })

  it('should toggle category', () => {
    expect(reducer({ selectedId: [] }, toggleCategory(1))).to.deep.equal({
      selectedId: [1],
    })

    expect(reducer({ selectedId: [1] }, toggleCategory(1))).to.deep.equal({
      selectedId: [],
    })
  })
})
