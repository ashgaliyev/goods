import React from 'react'
import { connect } from 'react-redux'
import { toggleCategory, reset } from '../../redux/categories/categories'

const CategoryList = ({ onEdit, items, selectedId, toggleCategory, reset }) =>
  <div className="CategoryList">
    {items.map((elem, i) =>
      <div key={i} className="checkbox">
        <label>
          <input type="checkbox" checked={selectedId.indexOf(elem.id) !== -1} />
          <a href="#" onClick={() => toggleCategory(elem.id)}>
            {elem.name}
          </a>
          <a href="#" onClick={() => onEdit(elem.id)}>
            Edit
          </a>
        </label>
      </div>
    )}
    {selectedId.length > 0 &&
      <div className="checkbox">
        <label>
          <a href="#" onClick={() => reset()}>
            Без категории
          </a>
        </label>
      </div>}
  </div>

const mapStateToProps = state => ({
  items: state.categories.items,
  selectedId: state.categories.selectedId,
})

const mapDispatchToProps = dispatch => ({
  toggleCategory: id => dispatch(toggleCategory(id)),
  reset: () => dispatch(reset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
