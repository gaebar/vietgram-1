import React from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { TiLocationArrow } from 'react-icons/ti'


class ChatsShow extends React.Component {
  constructor() {
    super()
    this.state = { chat: {}, name: '', value: '', showEmojis: false }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleEmojis = this.toggleEmojis.bind(this)
    this.addEmoji = this.addEmoji.bind(this)
    this.hideEmojis = this.hideEmojis.bind(this)
  }

  toggleEmojis(){
    this.setState(prevState => ({
      showEmojis: !prevState.showEmojis
    }))
  }

  hideEmojis(){
    this.setState({ showEmojis: false })
  }


  addEmoji(e){
    const emoji = e.native
    this.setState({
      value: this.state.value + emoji
    })
  }

  getData() {
    axios.get(`/api/chats/${this.props.match.params.chatId}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ chat: res.data }))
      .catch(err => console.log(err))
  }

  componentDidMount(){
    this.getData()
  }

  handleChange(e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({ name, value })
  }

  handleSubmit(e) {
    e.preventDefault()
    const comment = { [this.state.name]: this.state.value }
    axios.post(`/api/chats/${this.props.match.params.chatId}/comments`, comment, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.getData())
      .then(() => this.setState({ name: '', value: '' }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <section className="section">
        {
          !this.state.chat.comments &&
            <img src='https://media2.giphy.com/media/mFHVvtrf1n3qm3pdvr/giphy.gif?cid=790b76115d25fc155230413373f1d5d2&rid=giphy.gif' />
        }
        {
          this.state.chat.comments &&
          <div className="chat-show">
            <div className="panel">
              <div className="panel-header">
                <h2 className="panel-title text-center">{this.state.chat.title}</h2>
                <p className="title text-center">Chat with fellow {this.state.chat.title} about accomodation, transport, hidden gems and so on!</p>
              </div>
              <div className="panel-body">
                {this.state.chat.comments.map(comment => {
                  return <div key={comment._id} className={`message ${Auth.getPayload().sub === comment.user._id ? 'user-message' : 'tile chat-message'}`}>
                    <div className="tile-icon">
                      <Link to={`/users/${comment.user._id}`}>
                        <figure className="avatar"><img src={comment.user.image} alt="Avatar"/></figure>
                      </Link>
                    </div>
                    <div className="tile-content">
                      <p className="tile-title text-bold">
                        {comment.user.username}
                        <span> {comment.user.userType === 'Local' ? ' 🇻🇳 ' : '✈️ '} </span>
                        <small> {new Date(comment.createdAt).toLocaleString().slice(0,17)} </small>
                      </p>
                      <div className={`${Auth.getPayload().sub === comment.user._id ? 'user-flex' : ''}`}>
                        <p className={`${Auth.getPayload().sub === comment.user._id ? 'user-subtitle' : 'tile-subtitle'}`}>{comment.text}</p>
                      </div>
                    </div>
                  </div>
                })
                }
              </div>
              <div className="panel-footer chatshowpanel">
                <form onSubmit={this.handleSubmit} className="input-group">
                  <input className="form-input"
                    name="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                    placeholder="Type your message"
                  />
                  <span className="add-emoji-button" onClick={this.toggleEmojis}>😀</span>
                  <button type='submit' className="btn message-btn input-group-btn">
                    <TiLocationArrow />
                  </button>
                </form>
                {this.state.showEmojis &&
                <span className="emojipicker-container" onMouseLeave={this.hideEmojis}>
                  <Picker className={this.state.showEmojis}
                    onSelect={this.addEmoji}
                    emojiTooltip={true}
                    title="Chat"
                    emoji="grinning"
                  />
                </span>
                }
              </div>
            </div>

          </div>
        }
      </section>

    )
  }
}

export default ChatsShow
