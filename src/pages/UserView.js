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
        <Link to='/kibin' className='userName'>kibin</Link>
        <Link to='/ki_blank' className="userName">ki_blank</Link>
      </div>
    )
  }
}

export default UserView;