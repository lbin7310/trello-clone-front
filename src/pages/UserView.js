import React, { Component } from 'react'
import './UserView.scss'
import { Link } from 'react-router-dom';

class UserView extends Component {
  constructor () {
    super ()
    this.state={}
  }

  render() {
    return (
      <div className="signin__container">
        <Link to='/login' className='userName'>Sign In</Link>
      </div>
    )
  }
}

export default UserView;