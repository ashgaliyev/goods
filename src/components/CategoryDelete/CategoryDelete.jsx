import React from 'react'
import createModal from '../Form/Form'
import { ButtonGroup, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { del } from '../../redux/categories/categories'

const deleteForm = ({ _id, close, del }) =>
  <div>
    <p>Все товары в этой категории будут помечены "Без категории"</p>
    <ButtonGroup>
      <Button
        bsStyle="primary"
        onClick={() => {
          del(_id)
          close()
        }}>
        Да
      </Button>
      <Button bsStyle="default" onClick={() => close()}>
        Нет
      </Button>
    </ButtonGroup>
  </div>

const mapDispatchToProps = dispatch => ({
  del: id => dispatch(del(id)),
})

export default createModal(connect(null, mapDispatchToProps)(deleteForm))
