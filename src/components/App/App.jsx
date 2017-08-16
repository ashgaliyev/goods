import React, { Component, PropTypes } from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import CategoryList from '../CategoryList/CategoryList'
import { Button } from 'react-bootstrap'
import CategoryForm from '../CategoryForm'
import CategoryDelete from '../CategoryDelete'

const CATEGORY_CREATE = 'modal/category/CREATE'
const CATEGORY_UPDATE = 'modal/category/UPDATE'
const CATEGORY_DELETE = 'modal/category/DELETE'

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

  render() {
    const showCategoryForm =
      this.state.showModal === CATEGORY_CREATE ||
      (this.state.showModal === CATEGORY_UPDATE &&
        this.state.editCategoryId !== null)

    const showCategoryDelete =
      this.state.showModal === CATEGORY_DELETE &&
      this.state.editCategoryId !== null

    let catTitle = 'Добавить категорию'

    if (this.state.showModal === CATEGORY_UPDATE) {
      catTitle = 'Редактировать категорию'
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">LOGO</div>
          <div className="col-md-9">
            <Button onClick={this.addCategory}>Добавить категорию</Button>
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
          <div className="col-md-9" />
        </div>
      </div>
    )
  }
}
