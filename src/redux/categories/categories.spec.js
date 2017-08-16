import { expect } from 'chai'
import reducer, { selectCategory, save, del } from './categories'

describe('redux: categories', () => {
  it('works', () => {
    expect(true).to.be.true
  })

  it('should select category', () => {
    expect(reducer({ selectedId: null }, selectCategory(1))).to.deep.equal({
      selectedId: 1,
    })
  })

  it('should unselect categories', () => {
    expect(reducer({ selectedId: 1 }, selectCategory(null))).to.deep.equal({
      selectedId: null,
    })
  })

  it('should create category', () => {
    expect(reducer({ items: [] }, save(null, 'test'))).to.deep.equal({
      items: [{ id: 1, name: 'test' }],
    })
  })

  it('should delete category', () => {
    expect(reducer({ items: [{ id: 1, name: 'ttt' }] }, del(1))).to.deep.equal({
      items: [],
    })
  })
})
