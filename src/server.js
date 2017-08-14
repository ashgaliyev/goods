import express from 'express'
import App from './components/App'
import React from 'react'
import ReactDom from 'react-dom/server'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'

const app = express()

app.use((req, res) => {
  const store = configureStore()
  const context = {}
  const componentHTML = ReactDom.renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )

  if (context.url) {
    redirect(301, context.url)
  } else {
    res.end(renderHTML(componentHTML))
  }
})

const assetUrl =
  process.env.NODE_ENV !== 'production' ? 'http://localhost:8050' : '/'

function renderHTML(componentHTML) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Hello React</title>
      <link rel="stylesheet" href="${assetUrl}/public/assets/styles.css">
    </head>
    <body>
      <div id="react-view">${componentHTML}</div>
      <script type="application/javascript" src="${assetUrl}/public/assets/bundle.js"></script>
    </body>
    </html>
  `
}

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`)
})
