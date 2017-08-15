import React, { Component, PropTypes } from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import CategoryList from '../CategoryList/CategoryList'
import { Button } from 'react-bootstrap'
import CategoryForm from '../CategoryForm'

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      showModal: false,
    }

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  open() {
    this.setState({ showModal: true })
  }

  close() {
    this.setState({ showModal: false })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">LOGO</div>
          <div className="col-md-9">
            <Button onClick={this.open}>Добавить категорию</Button>
            <CategoryForm isShown={this.state.showModal} close={this.close} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <CategoryList />
          </div>
          <div className="col-md-9" />
        </div>
      </div>
    )
  }
}
