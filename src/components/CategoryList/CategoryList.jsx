import React from 'react'
import { connect } from 'react-redux'
import { selectCategory } from '../../redux/categories/categories'
import './CategoryList.css'

const CategoryList = ({
  onEdit,
  onDelete,
  items,
  selectedId,
  selectCategory,
  withoutCat,
}) =>
  <div className="category-list">
    {items.map((elem, i) =>
      <div
        key={i}
        onClick={() => selectCategory(elem._id)}
        className={
          selectedId === elem._id ? 'category-item active' : 'category-item'
        }>
        <a
          className="del-cat"
          href="#"
          onClick={e => {
            e.stopPropagation()
            onDelete(elem._id)
          }}>
          X
        </a>
        <a className="cat-name" href="#">
          {elem.name}
        </a>
        <a
          className="edit-cat"
          href="#"
          onClick={e => {
            e.stopPropagation()
            onEdit(elem._id)
          }}>
          Edit
        </a>
      </div>
    )}
    {withoutCat &&
      <div
        onClick={() => selectCategory(null)}
        className={
          selectedId === null ? 'category-item active' : 'category-item'
        }>
        <a href="#">Без категории</a>
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
