import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'

class Profile extends React.Component {
  constructor() {
    super()

    this.state = { user: null, gems: [], likedGems: [] }
  }

  getUserGems() {
    axios.get('/api/gems', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        const userGems = res.data.filter(gem => gem.user._id === this.state.user._id)
        const likedGems = res.data.filter(gem => {
          const array = gem.likes.filter(like => like.user === this.state.user._id)
          return array[0]
        })
        return this.setState({ gems: userGems, likedGems: likedGems })
      })
      .catch(err => console.log(err))
  }

  getUserData() {
    axios.get('/api/profile', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ user: res.data }))
      .then(() => this.getUserGems())
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getUserData()
  }

  render() {
    return (
      <div>
        {
          !this.state.user &&
          <img src='https://media2.giphy.com/media/mFHVvtrf1n3qm3pdvr/giphy.gif?cid=790b76115d25fc155230413373f1d5d2&rid=giphy.gif' />
        }
        {
          this.state.user &&
          <div className='user-page'>
            <div className="columns user-header">
              <div className="column col-5">
                <img src={this.state.user.image} className="profile-pic"/>
              </div>
              <div className="column col-7">
                <h2>{this.state.user.username} {this.state.user.userType === 'Tourist' ? <span>✈️ </span> : <span>🇻🇳 </span> }</h2>
                <br />
                <p>{this.state.user.text}</p>
                <div className='user-info'>
                  <div className="popover popover-bottom"><a className="followers-btn" href="#popovers">{this.state.user.followers.length} Followers</a>
                    <div className="popover-container">
                      <div className="card">
                        <div className="card-header">
                          <div className="card-title h5">Followers</div>
                          <div className="card-subtitle text-gray">Check out who follows you </div>
                        </div>
                        <div className="card-body">
                          {
                            this.state.user.followers.map(follower => {
                              return <div key={follower.user._id} className="tile">
                                <Link to={`/users/${follower.user._id}`}>
                                  <div className="tile-icon">
                                    <figure className="avatar"><img src={follower.user.image} alt="Avatar"/>
                                      <p className="tile-title text-bold">{follower.user.username}</p>
                                    </figure>
                                  </div>
                                  <div className="tile-content">

                                  </div>
                                </Link>
                              </div>
                            })
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  {
                    this.state.gems.length > 0 &&
                    <p>
                      <span> 💎  {this.state.gems.length} </span>
                      {
                        this.state.gems.length > 1 ? 'Gems' : 'Gem'
                      }
                    </p>
                  }
                </div>
              </div>
            </div>
            <div>
              <hr className="divider"/>
              <div className="columns col-oneline profile-nav">
                <div className="column col-5">
                  <Link to="/gems">Hidden gems</Link>
                </div>
                <div className="divider text-center col-2" data-content="OR"></div>
                <div className="column col-5">
                  <Link to="/chats">Join a chat</Link>
                </div>
              </div>
            </div>
            <div className='user-gems'>
              {
                this.state.gems.length === 0 && this.state.likedGems.length === 0 &&
                <div className="empty">
                  <div className="empty-icon">
                    <i className="icon icon-people"></i>
                  </div>
                  <p className="empty-title h5">Nothing to see here</p>
                  <p className="empty-subtitle">Looks like you have not posted or liked a hidden gem yet</p>
                  <p className="empty-subtitle">No worries, check out other hidden gems here:</p>
                  <div className="empty-action">
                    <Link className="btn btn-primary" to="/gems"> 💎 </Link>
                  </div>
                </div>
              }
              {
                this.state.gems.length > 0 &&
                <div>
                  <h3>Your hidden gems:</h3>
                  <div className='gems-list'>
                    {
                      this.state.gems.map(gem => {
                        return <Link to={`/gems/${gem._id}`} key={gem._id}><img src={gem.image} /></Link>
                      })
                    }
                  </div>
                </div>
              }
              {
                this.state.likedGems.length > 0 &&
                <div>
                  <h3>Hidden gems you liked:</h3>
                  <div className='gems-list'>
                    {
                      this.state.likedGems.map(gem => {
                        return <Link to={`/gems/${gem._id}`} key={gem._id}><img src={gem.image} /></Link>
                      })
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        }
      </div>
    )
  }
}

export default Profile
