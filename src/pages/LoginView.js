import React, { Component } from 'react'
import Login from '../components/Login'

class LoginView extends Component {
  constructor (props) {
    super (props)
    this.state={}
  }

  render() {
    const { isLogin, onLoginState, onLogout } = this.props
    return (
      <div>
        <Login isLogin={isLogin} onLoginState={onLoginState} onLogout={onLogout}/>
      </div>
    )
  }
}

export default LoginView;