import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'

class Chats extends React.Component {
  constructor() {
    super()

    this.state = { chats: null }
  }

  getData() {
    axios.get('/api/chats', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ chats: res.data }))
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    return (
      <section>
        <div className="chatsheader">
          <div className="text-center">
            <h1>Join a chat</h1>
          </div>
          <div className="text-center">
            <p>“Be genuinely interested in everyone you meet and everyone you meet will be genuinely interested in you”</p>
            <cite>― Rasheed Ogunlaru</cite>
          </div>
        </div>
        {
          this.state.chats &&
          <div className="chats">
            <div className="container">
              <div className="columns text-center">
                {
                  this.state.chats &&
                  this.state.chats.map(chat => {
                    return <div className="col-6 chat-cards" key={chat._id}>
                      <Link to={`chats/${chat._id}`}>
                        <div className="card cardstyle">
                          <div className="chatstitle">
                            Chat with {chat.title}
                          </div>
                          <div className="card-image">
                            <img src={chat.image} alt={chat.title} className="img-responsive"/>
                          </div>
                        </div>
                      </Link>
                    </div>
                  })
                }
              </div>
            </div>
          </div>
        }
      </section>
    )
  }
}

export default Chats
