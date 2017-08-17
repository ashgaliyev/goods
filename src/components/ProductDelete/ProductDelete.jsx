import React from 'react'
import createModal from '../Form/Form'
import { ButtonGroup, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { del } from '../../redux/products/products'

const deleteForm = ({ id, close, del }) =>
  <div>
    <p>Вы действительно хотите удалить товар?</p>
    <ButtonGroup>
      <Button
        bsStyle="primary"
        onClick={() => {
          del(id)
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
