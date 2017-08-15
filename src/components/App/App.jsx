import React, { Component, PropTypes } from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import CategoryList from '../CategoryList/CategoryList'

const App = props =>
  <div className="container">
    <div className="col-md-3">
      <CategoryList />
    </div>
    <div className="col-md-9" />
  </div>

export default App
