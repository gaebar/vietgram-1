import React, { Fragment } from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import { Link } from  'react-router-dom'
import { MdClear } from 'react-icons/md'
import { TiPencil } from 'react-icons/ti'

class GemsShow extends React.Component {
  constructor() {
    super()

    this.state = { gem: null , comment: {}, user: {} }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCommentDelete = this.handleCommentDelete.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.addLike = this.addLike.bind(this)
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    axios.get(`/api/gems/${this.props.match.params.gemId}`, {
      headers: { 'Authorization': `${Auth.getToken()}` }
    })
      .then(res => this.setState({ gem: res.data, comment: {} }))
      .catch(err => console.log(err))
  }

  addLike() {
    axios.get(`/api/gems/${this.props.match.params.gemId}/likes`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.getData())
      .catch(err => console.log(err))
  }

  handleChange(e) {
    this.setState({ comment: { text: e.target.value } })
  }


  handleSubmit(e) {
    e.preventDefault()

    axios.post(`/api/gems/${this.props.match.params.gemId}/comments`, this.state.comment, {
      headers: { 'Authorization': `${Auth.getToken()}` }
    })
      .then(() => this.getData())
      .catch(err => console.log(err))
  }

  isOwnerComment(comment) {
    return Auth.getPayload().sub === comment.user._id
  }
  isOwner() {
    return Auth.getPayload().sub === this.state.gem.user._id
  }

  handleCommentDelete(comment) {
    axios.delete(`/api/gems/${this.props.match.params.gemId}/comments/${comment._id}`, {
      headers: { 'Authorization': Auth.getToken() }
    })
      .then(() => this.getData())
      .catch(err => console.log(err))
  }

  handleDelete() {
    axios.delete(`/api/gems/${this.props.match.params.gemId}`, {
      headers: { 'Authorization': Auth.getToken() }
    })
      .then(() => this.props.history.push('/gems'))
      .catch(err => console.log(err))
  }

  render() {
    if (!this.state.gem) return null
    const { gem } = this.state
    return (
      <section className="section gemshow">
        <div className="container">
          <Fragment>
            <h2 className="title">{gem.name}</h2>
            <div className="columns">
              <div className="column is-half">
                <figure className="image">
                  <img className="gemshowimage" src={gem.image} alt={gem.name} />
                </figure>
              </div>
              <div className="column is-half">
                <div className="columns">
                  <div className="col-6">
                    <h4>{gem.location}</h4>
                  </div>
                  <div className="col-3">
                    <div className="chip">{gem.category}</div>
                  </div>
                </div>
                <div className="columns">
                  <p className="text-normal">Posted by <Link to={`/users/${gem.user._id}`} >{gem.user.username}</Link></p>
                  {this.isOwner() && <Link
                    className="btn btn-link btn-sm"
                    to={`/gems/${this.props.match.params.gemId}/edit`}
                  >
                    <TiPencil />
                  </Link>
                  }
                  {this.isOwner() &&
                    <button onClick={this.handleDelete} className="btn btn-link btn-sm">
                      <MdClear />
                    </button>
                  }
                </div>
                <div className='gem-likes'>
                  <button className="btn btn-link btn-lg" onClick={this.addLike} >💎</button>
                  <p className="text-bold">{gem.likes.length} likes</p>
                </div>
                <p>{gem.caption}</p>
                <hr/>
                {gem.comments.map(comment => (
                  <div key={comment._id} className="gem-comment">
                    <div className="text text-bold">
                      {comment.text}
                    </div>
                    <div className="user-comment">
                      <Link to={`/users/${comment.user._id}`} >{comment.user.username} </Link>
                      {<small>{new Date(comment.createdAt).toLocaleString().slice(0,17)}  </small>}
                      {
                        this.isOwnerComment(comment) &&
                        <button className="btn btn-link btn-sm" onClick={() => this.handleCommentDelete(comment)}><MdClear /></button>

                      }
                    </div>
                  </div>
                ))}

                {Auth.isAuthenticated() &&
                  <form onSubmit={this.handleSubmit}>
                    <div className="field">
                      <div className="control">
                        <textarea
                          className="form-input"
                          placeholder="What do you think?"
                          rows="2"
                          onChange={this.handleChange}
                          value={this.state.comment.text || ''}
                        >
                        </textarea>
                      </div>
                    </div>
                    <button className="btn btn-primary btn-sm" type="submit">Comment</button>
                  </form>}

                <Link to="/gems" className="float-right">Find More Gems</Link>
              </div>
            </div>
          </Fragment>
        </div>
      </section>
    )
  }
}

export default GemsShow
