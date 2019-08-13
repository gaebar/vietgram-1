import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import Auth from '../../lib/Auth'
import { GiIsland } from 'react-icons/gi'

class Navbar extends React.Component {
  constructor(){
    super()
    this.state = { navbarOpen: false, user: {} }
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.logout = this.logout.bind(this)
  }

  logout() {
    Auth.logout()
    this.setState({ user: {} })
    this.props.history.push('/')
  }

  toggleNavbar() {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  getUserData() {
    axios.get('/api/profile', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ user: res.data }))
      .catch(err => console.log(err))
  }

  componentDidMount() {
    Auth.isAuthenticated() && this.getUserData()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ navbarOpen: false })
      Auth.isAuthenticated() && this.getUserData()
    }
  }

  render() {
    return (
      <header className="navbar">
        <section className="navbar-section">
          <Link to="/" className="title"><GiIsland /><span>  </span>Vietgram</Link>
        </section>
        {
          Auth.isAuthenticated() &&
          <section className="navbar-section">
            {
              this.state.user.username &&
                <div className="dropdown dropdown-right">
                  <a href="#" className="btn btn-link dropdown-toggle" tabIndex="0">
                    <div className="chip chip-link">
                      <img src={this.state.user.image} className="avatar avatar-sm" />
                      {this.state.user.username}
                    </div>
                    <i className="icon icon-caret"></i>
                  </a>
                  <ul className="menu nav-menu">
                    <li><Link to="/gems">Find new Gems</Link></li>
                    <li><Link to="/chats">Join a Chat</Link></li>
                    <li><Link to="/profile">Your Profile</Link></li>
                    <hr />
                    <li><a onClick={this.logout} className="c-hand">Logout</a></li>
                  </ul>
                </div>
            }
          </section>
        }


      </header>
    )
  }

}

export default withRouter(Navbar)
