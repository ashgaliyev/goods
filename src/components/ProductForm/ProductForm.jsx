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
        categoryId: parseInt(e.target.value) === -1 ? null : e.target.value,
      })
    )
  }

  onSave(e) {
    e.preventDefault()

    const { id, categoryId, name, purchasePrice, price } = this.state

    this.props.update(id, categoryId, name, purchasePrice, price)

    if (typeof this.props.close !== 'undefined') {
      this.props.close()
    }
  }

  render() {
    const { close } = this.props
    const {
      id,
      categories,
      categoryId,
      name,
      purchasePrice,
      price,
    } = this.state

    return (
      <form>
        <div className="form-group">
          <label>Категория</label>
          <FormControl
            componentClass="select"
            value={categoryId === null ? -1 : categoryId}
            onChange={this.changeCategory}>
            <option key={9999} value={-1}>
              Без категории
            </option>
            {categories.map(elem =>
              <option key={elem.id} value={elem.id}>
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

ProductForm.propTypes = {
  id: PropTypes.number,
  categoryId: PropTypes.number,
  categories: PropTypes.array.isRequired,
  name: PropTypes.string,
  purchasePrice: PropTypes.number,
  price: PropTypes.number,
  update: PropTypes.func.isRequired,
  close: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => {
  let props = {
    id: null,
    categoryId: null,
    name: '',
    purchasePrice: 0,
    price: 0,
  }
  if (ownProps.id !== null) {
    let product = state.products.items.reduce(
      (acc, elem) => (elem.id === ownProps.id ? elem : acc),
      null
    )
    props = { ...product }
  }

  props.categories = state.categories.items

  return props
}
const mapDispatchToProps = dispatch => ({
  update: (id, categoryId, name, purchasePrice, price) => {
    dispatch(save(id, categoryId, name, purchasePrice, price))
  },
})

export default createModal(
  connect(mapStateToProps, mapDispatchToProps)(ProductForm)
)
