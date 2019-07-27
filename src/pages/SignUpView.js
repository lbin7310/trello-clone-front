import React, { Component } from 'react'
import SignUp from '../components/SignUp'

class SignUpView extends Component {
  constructor (props) {
    super (props)
    this.state={}
  }

  render() {
    const { isLogin, currentNickName, onLoginState, onLogout }=this.props;
    return (
      <div>
        <SignUp isLogin={isLogin}
          onLoginState={onLoginState}
          currentNickName={currentNickName}
          onLogout={onLogout}/>
      </div>
    )
  }
}

export default SignUpView;