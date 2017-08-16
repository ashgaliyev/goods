import React from 'react'
import { connect } from 'react-redux'
import { selectCategory } from '../../redux/categories/categories'

const CategoryList = ({
  onEdit,
  onDelete,
  items,
  selectedId,
  selectCategory,
  withoutCat,
}) =>
  <div className="CategoryList">
    {items.map((elem, i) =>
      <div key={i} className={selectedId === elem.id ? 'active' : ''}>
        <a href="#" onClick={() => onDelete(elem.id)}>
          X
        </a>
        <a href="#" onClick={() => selectCategory(elem.id)}>
          {elem.name}
        </a>
        <a href="#" onClick={() => onEdit(elem.id)}>
          Edit
        </a>
      </div>
    )}
    {withoutCat &&
      <div className={selectedId === null ? 'active' : ''}>
        <a href="#" onClick={() => selectCategory(null)}>
          Без категории
        </a>
      </div>}
  </div>

const mapStateToProps = state => ({
  items: state.categories.items,
  selectedId: state.categories.selectedId,
  withoutCat:
    state.products.items.reduce(
      (acc, p) => (p.category_id === null ? acc + 1 : acc),
      0
    ) > 0,
})

const mapDispatchToProps = dispatch => ({
  selectCategory: id => dispatch(selectCategory(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
