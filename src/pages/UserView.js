import React, { Component } from 'react'
import './UserView.css'
import { Link } from 'react-router-dom';

class UserView extends Component {
  constructor () {
    super ()
    this.state={}
  }

  render() {
    return (
      <div>
        <Link to='/login' className='userName'>Sign In</Link>
      </div>
    )
  }
}

export default UserView;