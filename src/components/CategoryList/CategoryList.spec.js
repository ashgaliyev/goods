import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import CategoryList from './CategoryList'
import configureStore from '../../redux/configureStore'

describe('component: CategoryList', () => {
  it('should render', () => {
    const store = configureStore()
    const div = document.createElement('div')
    ReactDOM.render(
      <Provider store={store}>
        <CategoryList />
      </Provider>,
      div
    )
    expect(true).to.be.true
  })
})
