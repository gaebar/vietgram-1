import React from 'react'
import { Link } from  'react-router-dom'

const Gem = ({ image, location, user, _id }) => {
  return (
    <div className="column col-3 col-lg-6 col-sm-12 gem-card">

      <div className="card gem-card">
        <Link to={`/gems/${_id}`} >
          <div className="card-image">
            <img src={image} className="img-responsive"/>
          </div>
          <div className="card-header">
            <div className="card-title h5">{location}</div>
          </div>
        </Link>
        <div className="card-body">
          <div className="card-subtitle text-gray">
            <div className="chip">
              <Link to={`/users/${user._id}`} aria-label="Close" role="button">
                <img src={user.image} className="avatar avatar-sm" />
                {user.username}
                <span> {user.userType === 'Local' ? ' 🇻🇳 ' : ' ✈️ '} </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Gem
