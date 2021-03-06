import express from 'express'
import { MongoClient } from 'mongodb'
import bodyParser from 'body-parser'
import App from './components/App'
import React from 'react'
import ReactDom from 'react-dom/server'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
import routes from './routes'
import path from 'path'

const dbUrl =
  'mongodb://' +
  process.env.DB_USERNAME +
  ':' +
  process.env.DB_PASSWORD +
  '@ds145273.mlab.com:45273/goods'

const app = express()
const PORT = process.env.PORT || 3002
const assetUrl =
  process.env.NODE_ENV !== 'production' ? 'http://localhost:8050' : ''

app.use('/public', express.static(path.join(__dirname, '..', 'public')))
console.log(path.join(__dirname, '..', 'public'))

//app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

function renderHTML(componentHTML, state) {
  return (
    `
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
      <script type="application/javascript">
        window._INITIAL_STATE_ = ` +
    JSON.stringify(state) +
    `
      </script>
      <script type="application/javascript" src="${assetUrl}/public/assets/bundle.js"></script>
    </body>
    </html>
  `
  )
}

MongoClient.connect(dbUrl, (err, db) => {
  if (err) {
    console.log(err)
    return
  }
  routes(app, db)

  app.use((req, res) => {
    db.collection('categories').find({}).toArray((err, result) => {
      if (err) {
        console.log(err)
        res.send({ error: 'An error has occured' })
      } else {
        db.collection('products').find({}).toArray((err2, res2) => {
          if (err2) {
            console.log(err2)
            res.send({ error: 'An error has occured' })
          } else {
            const state = {
              categories: { items: result, selectedId: null },
              products: { items: res2 },
            }

            console.log(state)

            const store = configureStore(state)

            const context = {}
            const componentHTML = ReactDom.renderToString(
              <Provider store={store}>
                <App />
              </Provider>
            )

            if (context.url) {
              redirect(301, context.url)
            } else {
              res.end(renderHTML(componentHTML, state))
            }
          }
        })
      }
    })
  })

  app.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`)
  })
})
