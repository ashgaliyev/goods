import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { save } from '../../redux/products/products'
import createModal from '../Form/Form'

class ProductForm extends Component {
  constructor(props) {
    super(props)

    this.state = props

    this.onSave = this.onSave.bind(this)
    this.changeName = this.changeName.bind(this)
    this.changePurchasePrice = this.changePurchasePrice.bind(this)
    this.changePrice = this.changePrice.bind(this)
    this.changeCategory = this.changeCategory.bind(this)
  }

  changeName(e) {
    this.setState(
      Object.assign({}, this.state, {
        name: e.target.value,
      })
    )
  }

  changePurchasePrice(e) {
    this.setState(
      Object.assign({}, this.state, {
        purchasePrice: e.target.value,
      })
    )
  }

  changePrice(e) {
    this.setState(
      Object.assign({}, this.state, {
        price: e.target.value,
      })
    )
  }

  changeCategory(e) {
    this.setState(
      Object.assign({}, this.state, {
        category_id: e.target.value === '-1' ? null : e.target.value,
      })
    )
  }

  onSave(e) {
    e.preventDefault()

    const { _id, category_id, name, purchasePrice, price } = this.state

    this.props.update(_id, category_id, name, purchasePrice, price)

    if (typeof this.props.close !== 'undefined') {
      this.props.close()
    }
  }

  render() {
    const { close } = this.props
    const {
      _id,
      categories,
      category_id,
      name,
      purchasePrice,
      price,
    } = this.state

    console.log(category_id)

    return (
      <form>
        <div className="form-group">
          <label>Категория</label>
          <FormControl
            componentClass="select"
            value={category_id === null ? -1 : category_id}
            onChange={this.changeCategory}>
            <option key={9999} value={-1}>
              Без категории
            </option>
            {categories.map(elem =>
              <option key={elem._id} value={elem._id}>
                {elem.name}
              </option>
            )}
          </FormControl>
        </div>
        <div className="form-group">
          <label>Название</label>
          <input
            type="text"
            className="form-control"
            value={this.state.name}
            onChange={this.changeName}
          />
        </div>
        <div className="form-group">
          <label>Закупочная стоимость</label>
          <input
            type="text"
            className="form-control"
            value={purchasePrice}
            onChange={this.changePurchasePrice}
          />
        </div>
        <div className="form-group">
          <label>Розничная цена</label>
          <input
            type="text"
            className="form-control"
            value={price}
            onChange={this.changePrice}
          />
        </div>
        <button onClick={this.onSave} className="btn btn-primary">
          Сохранить
        </button>
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let props = {
    _id: null,
    category_id: null,
    name: '',
    purchasePrice: 0,
    price: 0,
  }
  if (ownProps._id !== null) {
    let product = state.products.items.reduce(
      (acc, elem) => (elem._id === ownProps._id ? elem : acc),
      null
    )
    props = { ...product }
  }

  if (props.category_id === null && state.categories.selectedId !== null) {
    props.category_id = state.categories.selectedId
  }

  props.categories = state.categories.items

  return props
}
const mapDispatchToProps = dispatch => ({
  update: (id, category_id, name, purchasePrice, price) => {
    dispatch(save(id, category_id, name, purchasePrice, price))
  },
})

export default createModal(
  connect(mapStateToProps, mapDispatchToProps)(ProductForm)
)
