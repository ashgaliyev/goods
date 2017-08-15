import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { save } from '../../redux/categories/categories'

class CategoryForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: props.name,
    }

    this.change = this.change.bind(this)
  }

  change(e) {
    this.setState({ name: e.target.value })
  }

  render() {
    const { title, isShown, close, update } = this.props

    return (
      <Modal className="modal-container" show={isShown} onHide={() => close()}>
        <Modal.Header>
          <Modal.Title>
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <input type="text" value={this.state.name} onChange={this.change} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => update(this.state.id, this.state.name)}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  update: (id, name) => dispatch(save(id, name)),
})

export default connect(null, mapDispatchToProps)(CategoryForm)
