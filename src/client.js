import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'

const store = configureStore()

const component = (
  <Provider store={store}>
    <App />
  </Provider>
)
ReactDOM.render(component, document.getElementById('react-view'))
