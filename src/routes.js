import { ObjectID } from 'mongodb'

export default function(app, db) {
  app.get('/update-state', (req, res) => {
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
              categories_items: result,
              products_items: res2,
            }

            res.send(state)
          }
        })
      }
    })
  })
  //get
  app.get('/categories', (req, res) => {
    const result = db
      .collection('categories')
      .find({})
      .toArray((err, result) => {
        if (err) {
          console.log(err)
          res.send({ error: 'An error has occured' })
        } else {
          res.send(result)
        }
      })
  })

  //insert
  app.post('/categories', (req, res) => {
    const category = {
      name: req.body.name,
    }
    db.collection('categories').insert(category, (err, result) => {
      if (err) {
        console.log(err)
        res.send({ error: 'An error has occured' })
      } else {
        res.send(result)
      }
    })
  })

  //update
  app.put('/categories/:id', (req, res) => {
    const id = req.params.id
    const details = { _id: new ObjectID(id) }
    const category = { name: req.body.name }
    db.collection('categories').update(details, category, (err, result) => {
      if (err) {
        console.log(err)
        res.send({ error: 'An error has occured' })
      } else {
        res.send(category)
      }
    })
  })

  //delete
  app.delete('/categories/:id', (req, res) => {
    const id = req.params.id
    const details = { _id: new ObjectID(id) }
    db.collection('categories').remove(details, (err, item) => {
      if (err) {
        console.log(err)
        res.send({ error: 'An error has occured' })
      } else {
        db.collection('products').updateMany(
          { category_id: new ObjectID(id) },
          {
            $set: {
              category_id: null,
            },
          }
        )
        res.send('Category ' + id + ' deleted!')
      }
    })
  })

  //get
  app.get('/products/category/:id', (req, res) => {
    const id = req.params.id === 'null' ? null : new ObjectID(req.params.id)
    const query = { category_id: id }
    db.collection('products').find(query).toArray((err, result) => {
      if (err) {
        console.log(err)
        res.send({ error: 'An error has occured' })
      } else {
        res.send(result)
      }
    })
  })

  //insert
  app.post('/products', (req, res) => {
    const catId = req.body.category_id
    const product = {
      name: req.body.name,
      category_id: catId === null ? null : new ObjectID(catId),
      purchasePrice: req.body.purchasePrice,
      price: req.body.price,
    }
    db.collection('products').insert(product, (err, result) => {
      if (err) {
        console.log(err)
        res.send({ error: 'An error has occured' })
      } else {
        res.send(result)
      }
    })
  })

  //update
  app.put('/products/:id', (req, res) => {
    const id = req.params.id
    const catId = req.body.category_id
    const details = { _id: new ObjectID(id) }
    const product = {
      name: req.body.name,
      category_id: catId === null ? null : new ObjectID(catId),
      purchasePrice: req.body.purchasePrice,
      price: req.body.price,
    }
    db.collection('products').update(details, product, (err, result) => {
      if (err) {
        console.log(err)
        res.send({ error: 'An error has occured' })
      } else {
        res.send(product)
      }
    })
  })

  //delete
  app.delete('/products/:id', (req, res) => {
    const id = req.params.id
    const details = { _id: new ObjectID(id) }
    db.collection('products').remove(details, (err, item) => {
      if (err) {
        console.log(err)
        res.send({ error: 'An error has occured' })
      } else {
        res.send('Product' + id + ' deleted!')
      }
    })
  })
}
