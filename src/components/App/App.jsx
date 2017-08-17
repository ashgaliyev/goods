import React, { Component, PropTypes } from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import CategoryList from '../CategoryList/CategoryList'
import { Button, ButtonGroup } from 'react-bootstrap'
import CategoryForm from '../CategoryForm'
import CategoryDelete from '../CategoryDelete'
import ProductList from '../ProductList'
import ProductForm from '../ProductForm'
import ProductDelete from '../ProductDelete'

const CATEGORY_CREATE = 'modal/category/CREATE'
const CATEGORY_UPDATE = 'modal/category/UPDATE'
const CATEGORY_DELETE = 'modal/category/DELETE'
const PRODUCT_CREATE = 'modal/product/CREATE'
const PRODUCT_UPDATE = 'modal/product/UPDATE'
const PRODUCT_DELETE = 'modal/product/DELETE'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      showModal: null,
      editCategoryId: null,
      editProductId: null,
    }

    this.close = this.close.bind(this)
    this.editCategory = this.editCategory.bind(this)
    this.addCategory = this.addCategory.bind(this)
    this.deleteCategory = this.deleteCategory.bind(this)
    this.addProduct = this.addProduct.bind(this)
    this.editProduct = this.editProduct.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
  }

  close() {
    this.setState({
      showModal: null,
      editCategoryId: null,
      editProductId: null,
    })
  }

  addCategory() {
    this.setState({
      showModal: CATEGORY_CREATE,
      editCategoryId: null,
      editProductId: null,
    })
  }

  editCategory(id) {
    this.setState({
      showModal: CATEGORY_UPDATE,
      editCategoryId: id,
      editProductId: null,
    })
  }

  deleteCategory(id) {
    this.setState({
      showModal: CATEGORY_DELETE,
      editCategoryId: id,
      editProductId: null,
    })
  }

  addProduct() {
    this.setState({
      showModal: PRODUCT_CREATE,
      editCategoryId: null,
      editProductId: null,
    })
  }

  editProduct(id) {
    this.setState({
      showModal: PRODUCT_UPDATE,
      editCategoryId: null,
      editProductId: id,
    })
  }

  deleteProduct(id) {
    this.setState({
      showModal: PRODUCT_DELETE,
      editCategoryId: null,
      editProductId: id,
    })
  }

  render() {
    const showCategoryForm =
      this.state.showModal === CATEGORY_CREATE ||
      (this.state.showModal === CATEGORY_UPDATE &&
        this.state.editCategoryId !== null)

    const showCategoryDelete =
      this.state.showModal === CATEGORY_DELETE &&
      this.state.editCategoryId !== null

    const showProductForm =
      this.state.showModal === PRODUCT_CREATE ||
      (this.state.showModal === PRODUCT_UPDATE &&
        this.state.editProductId !== null)

    const showProductDelete =
      this.state.showModal === PRODUCT_DELETE &&
      this.state.editProductId !== null

    let catTitle = 'Добавить категорию'

    if (this.state.showModal === CATEGORY_UPDATE) {
      catTitle = 'Редактировать категорию'
    }

    let productTitle = 'Добавить товар'

    if (this.state.showModal === PRODUCT_UPDATE) {
      productTitle = 'Редактировать товар'
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">LOGO</div>
          <div className="col-md-9">
            <ButtonGroup>
              <Button onClick={this.addProduct}>Добавить товар</Button>
              <Button onClick={this.addCategory}>Добавить категорию</Button>
            </ButtonGroup>
            <ProductForm
              title={productTitle}
              id={this.state.editProductId}
              isShown={showProductForm}
              close={this.close}
            />
            <ProductDelete
              title=""
              id={this.state.editProductId}
              isShown={showProductDelete}
              close={this.close}
            />
            <CategoryForm
              title={catTitle}
              id={this.state.editCategoryId}
              isShown={showCategoryForm}
              close={this.close}
            />
            <CategoryDelete
              title="Хотите удалить категорию?"
              id={this.state.editCategoryId}
              isShown={showCategoryDelete}
              close={this.close}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <CategoryList
              onDelete={id => this.deleteCategory(id)}
              onEdit={id => this.editCategory(id)}
            />
          </div>
          <div className="col-md-9">
            <ProductList
              onDelete={id => this.deleteProduct(id)}
              onEdit={id => this.editProduct(id)}
            />
          </div>
        </div>
      </div>
    )
  }
}
