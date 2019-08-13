import React, { Fragment } from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class GemEdit extends React.Component {
  constructor() {
    super()

    this.state = { gem: {}, errors: null }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/gems/${this.props.match.params.gemId}`, {
      headers: { 'Authorization': `${Auth.getToken()}` }
    })
      .then(res => this.setState({ gem: res.data }))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleChange({ target: { name, value } }) {
    const gem = { ...this.state.gem, [name]: value }
    this.setState({ gem })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.put(`/api/gems/${this.props.match.params.gemId}`, this.state.data, {
      headers: { 'Authorization': `${Auth.getToken()}` }
    })
      .then(() => this.props.history.push('/gems'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {
    if (!this.state.gem) return null
    const { gem } = this.state
    return (
      <section className="section">
        <div className="container gem-edit">
          <Fragment>
            <h2 className="title">{gem.name}</h2>
            <div className="columns">
              <div className="col-6">
                <img src={gem.image} alt={gem.name} className="img-responsive"/>
              </div>
              <div className="col-6">
                <form onSubmit={this.handleSubmit} className="form-autocomplete">
                  <h2 className="title text-center">Location</h2>
                  <input
                    className={`form-input input-sm ${this.state.errors ? 'is-error' : ''} `}
                    name="location"
                    value = {gem.location || ''}
                    placeholder="where is this?"
                    onChange={this.handleChange}
                  />
                  {this.state.errors && <small className="help is-danger">{this.state.errors.location}</small>}

                  <h2 className="title text-center">Caption</h2>
                  <textarea
                    className={`form-input input-sm ${this.state.errors ? 'is-error' : ''} `}
                    name="caption"
                    value = {gem.caption || ''}
                    rows= "5"
                    placeholder="caption here"
                    onChange={this.handleChange}
                  />
                  {this.state.errors && <small className="help is-danger">{this.state.errors.caption}</small>}

                  <h2 className="title text-center">Category</h2>

                  <div className="form-group">
                    <select
                      className={`form-select ${this.state.errors ? 'is-error' : ''} `}
                      name="category"
                      value = {gem.category || ''}
                      onChange={this.handleChange}
                    >
                      <option>Choose an option</option>
                      <option>Markets</option>
                      <option>Temples</option>                      <option>Beaches</option>
                      <option>Landscapes</option>
                      <option>Others</option>
                    </select>
                  </div>
                  {this.state.errors && <small className="help is-danger">{this.state.errors.category}</small>}
                  <br />
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary input-group-btn input-sm gemeditsubmit">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </Fragment>
        </div>
      </section>
    )
  }
}

export default GemEdit
