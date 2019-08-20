import React, { Component } from 'react';
import SignUp from '../components/SignUp';
import './SignUpView.scss';

class SignUpView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isLogin, currentNickName, onLoginState, onLogout } = this.props;
    return (
      <div className="signupView">
        <div className="signup__text">Sign up</div>
        <SignUp
          isLogin={isLogin}
          onLoginState={onLoginState}
          currentNickName={currentNickName}
          onLogout={onLogout}
        />
      </div>
    );
  }
}

export default SignUpView;
