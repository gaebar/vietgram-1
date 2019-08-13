import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import { Link } from  'react-router-dom'

class Login extends React.Component {
  constructor() {
    super()

    this.state = { data: {}, error: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({ target: { name, value } }) {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data, error: '' })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/login', this.state.data)
      .then(res => {
        Auth.setToken(res.data.token)
        this.props.history.push('/profile')
      })
      .catch(() => this.setState({ error: 'Invalid Crendentials' }))
  }

  render(){
    return (
      <section className="container loginsection">
        <div className="columns">
          <div className="column col-7"></div>
          <div className="column col-3 logincolumn">
            <form className="login-form" onSubmit={this.handleSubmit}>
              <h2 className="title">Login</h2>
              {this.state.error && <small className="help is-danger">{this.state.error}</small>}
              <div className="form-group">
                <label className="form-label" htmlFor="name"></label>
                <input
                  className={`form-input ${this.state.error ? 'is-error' : ''} `}
                  name="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email"></label>
                <input
                  className={`form-input ${this.state.error ? 'is-error' : ''} `}
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
              </div>
              <br />
              <hr className="divider"/>
              <br />
              <button className="btn btn-warning input-group-btn">Login</button>
              <p> Dont have an account? </p>
              <Link to="/register" className="c-hand">Register here</Link>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default Login
