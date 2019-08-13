import React from 'react'
import axios from 'axios'

class Register extends React.Component {
  constructor() {
    super()

    this.state = { data: {}, errors: {}, vnFlag: '', gbFlag: '' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getVnData() {
    axios('https://restcountries.eu/rest/v2/alpha/vn')
      .then(res => this.setState({ vnFlag: res.data.flag }))
      .catch(err => console.log(err))
  }

  getGbData() {
    axios('https://restcountries.eu/rest/v2/alpha/gb')
      .then(res => this.setState({ gbFlag: res.data.flag }))
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getVnData()
    this.getGbData()
  }

  handleChange({ target: { name, value } }) {
    const data = { ...this.state.data, [name]: value }
    const errors = { ...this.state.errors, [name]: '' }
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/register', this.state.data)
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {
    return (
      <section className="section registersection">
        {
          this.state.gbFlag &&
          <div className="columns">
            <div className="col-4"></div>
            <div className="col-3 registercolumn">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group text-center">
                  <h2 className="title">Sign Up</h2>
                  <input
                    className={`form-input input-sm ${this.state.errors.username ? 'is-error' : ''} `}
                    name="username"
                    placeholder="Username"
                    onChange={this.handleChange}
                  />
                  {this.state.errors && <small className="help is-danger">{this.state.errors.username}</small>}

                  <input
                    className={`form-input input-sm ${this.state.errors.email ? 'is-error' : ''} `}
                    name="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                  />
                  {this.state.errors && <small className="help is-danger">{this.state.errors.email}</small>}

                  <input
                    className={`form-input input-sm ${this.state.errors.password ? 'is-error' : ''} `}
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={this.handleChange}
                  />
                  {this.state.errors && <small className="help is-danger">{this.state.errors.password}</small>}

                  <input
                    className={`form-input input-sm ${this.state.errors.passwordConfirmation ? 'is-error' : ''} `}
                    name="passwordConfirmation"
                    placeholder="Password Confirmation"
                    type="password"
                    onChange={this.handleChange}
                  />
                  {this.state.errors && <small className="help is-danger">{this.state.errors.passwordConfirmation}</small>}
                  <label className="form-label" htmlFor="image">Profile Picture</label>
                  <input
                    className={`form-input input-sm ${this.state.errors.image ? 'is-error' : ''} `}
                    name="image"
                    placeholder="Link to profile picture"
                    onChange={this.handleChange}
                  />
                  {this.state.errors && <small className="help is-danger">{this.state.errors.image}</small>}

                  <div className="form-group">
                    <label className="form-label" htmlFor="Lang">Preferred Language</label>
                    <input type="radio" id="tag-0" className="filter-tag" name="lang" value ='vi' onChange={this.handleChange} hidden />
                    <input type="radio" id="tag-1" className="filter-tag" name="lang" value ='en' onChange={this.handleChange} hidden />


                    <div className="filter-nav">
                      <label htmlFor="tag-0">
                        <figure
                          className={`avatar avatar-lg ${this.state.data.lang === 'vi' ? 'badge' : ''} `}
                          data-badge={`${this.state.data.lang === 'vi' ? '✔️' : ''} `}
                        >
                          <img
                            src={this.state.vnFlag}
                            style={ {
                              objectFit: 'cover'
                            } }
                          />
                        </figure>
                      </label>
                      <label htmlFor="tag-1">
                        <figure
                          className={`avatar avatar-lg ${this.state.data.lang === 'en' ? 'badge' : ''} `}
                          data-badge={`${this.state.data.lang === 'en' ? '✔️' : ''} `}
                        >
                          <img
                            src={this.state.gbFlag}
                            style={ {
                              objectFit: 'cover'
                            } }
                          />
                        </figure>
                      </label>
                    </div>

                    <br />
                    {this.state.errors && <small className="help is-danger">{this.state.errors.lang}</small>}
                  </div>

                  <div className="form-group">

                    <textarea
                      className={`form-input ${this.state.errors.text ? 'is-error' : ''} `}
                      placeholder="Introduce yourself!"
                      rows="3"
                      name="text"
                      onChange={this.handleChange}>
                    </textarea>
                    {this.state.errors && <small className="help is-danger">{this.state.errors.text}</small>}
                  </div>

                  <label className="form-label" htmlFor="email">I am a</label>
                  <div className="form-group">
                    <label className="form-radio form-inline">
                      <input type="radio" name="userType" value="tourist" onChange={this.handleChange}/><i className="form-icon"></i> Tourist
                    </label>
                    <label className="form-radio form-inline">
                      <input type="radio" name="userType" value="local" onChange={this.handleChange}/><i className="form-icon"></i> Local
                    </label>
                    <br />
                    {this.state.errors && <small className="help is-danger">{this.state.errors.userType}</small>}

                  </div>
                </div>
                <button type="submit" className="btn btn-primary input-group-btn input-sm submitbutton">Submit</button>
              </form>
            </div>
            <div className="col-4"></div>
          </div>
        }
      </section>
    )
  }
}

export default Register


// <label className="form-radio form-inline">
//   <input type="radio" name="lang" value="en" onChange={this.handleChange}/>
//   <i className="form-icon"></i>
//   English
// </label>
// <label className="form-radio form-inline">
//   <input  type="radio" name="lang" value="vi" onChange={this.handleChange}/>
//   <i className="form-icon"></i>
//   Vietnamese
// </label>
