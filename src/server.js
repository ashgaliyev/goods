import express from 'express'
import { MongoClient } from 'mongodb'
import bodyParser from 'body-parser'
import App from './components/App'
import React from 'react'
import ReactDom from 'react-dom/server'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
import routes from './routes'
import { dbUrl } from './config/db'
import path from 'path'

const app = express()
const PORT = process.env.PORT || 3002
const assetUrl =
  process.env.NODE_ENV !== 'production' ? 'http://localhost:8050/' : ''

app.use('/public', express.static(path.join(__dirname, '..', 'public')))
console.log(path.join(__dirname, '..', 'public'))

app.use(bodyParser.urlencoded({ extended: true }))

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

MongoClient.connect(dbUrl, (err, database) => {
  if (err) {
    console.log(err)
    return
  }
  routes(app, database)

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

  app.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`)
  })
})
