import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { save } from '../../redux/categories/categories'
import createModal from '../Form/Form'

class CategoryForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: props.name,
      _id: props._id,
    }

    this.change = this.change.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  change(e) {
    this.setState({ name: e.target.value })
  }

  onSave() {
    const { _id, name } = this.state

    this.props.update(_id, name)

    if (typeof this.props.close !== 'undefined') {
      this.props.close()
    }
  }

  render() {
    const { close } = this.props
    const { name } = this.state

    return (
      <div>
        <div className="form-group">
          <label>Название</label>
          <input
            type="text"
            className="form-control"
            value={this.state.name}
            onChange={this.change}
          />
        </div>
        <button onClick={this.onSave} className="btn btn-primary">
          Сохранить
        </button>
      </div>
    )
  }
}

CategoryForm.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  close: PropTypes.func,
}

const mapStateToProps = (state, ownProps) => ({
  name:
    ownProps._id === null
      ? ''
      : state.categories.items.reduce(
          (acc, { _id, name }) => (_id === ownProps._id ? name : acc),
          ''
        ),
})

const mapDispatchToProps = dispatch => ({
  update: (id, name) => {
    dispatch(save(id, name))
  },
})

export default createModal(
  connect(mapStateToProps, mapDispatchToProps)(CategoryForm)
)
