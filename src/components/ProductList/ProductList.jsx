import React from 'react'
import { Table, Button, ButtonGroup } from 'react-bootstrap'
import { connect } from 'react-redux'

const filterItemsByCatId = (items, catId) =>
  items.filter(elem => {
    if (catId === null) {
      return elem.categoryId === null
    }
    return elem.categoryId === catId
  })

const ProductList = ({ items, selectedCatId, onDelete, onEdit }) =>
  <Table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Название товара</th>
        <th>Цена / закуп</th>
        <th>Цена</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {filterItemsByCatId(items, selectedCatId).map((elem, i) =>
        <tr key={i}>
          <td>
            {elem.id}
          </td>
          <td>
            {elem.name}
          </td>
          <td>
            {elem.purchasePrice}
          </td>
          <td>
            {elem.price}
          </td>
          <td>
            <ButtonGroup>
              <Button onClick={() => onDelete(elem.id)} bsStyle="danger">
                Удалить
              </Button>
              <Button onClick={() => onEdit(elem.id)} bsStyle="primary">
                Изменить
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      )}
    </tbody>
  </Table>

const mapStateToProps = state => ({
  items: state.products.items,
  selectedCatId: state.categories.selectedId,
})

export default connect(mapStateToProps, null)(ProductList)
