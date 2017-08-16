import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'

const createModal = WrappedComponent => {
  return class extends Component {
    render() {
      const { isShown, title, close } = this.props

      return (
        <Modal
          className="modal-container"
          show={isShown}
          onHide={() => close()}>
          <Modal.Header>
            <Modal.Title>
              {title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <WrappedComponent {...this.props} />
          </Modal.Body>
        </Modal>
      )
    }
  }
}

export default createModal
