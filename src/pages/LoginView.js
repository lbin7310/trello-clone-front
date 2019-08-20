import React, { Component } from 'react';
import Login from '../components/Login';
import './LoginView.scss';

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isLogin, onLoginState, onLogout } = this.props;
    return (
      <div className="login__container">
        <Login
          isLogin={isLogin}
          onLoginState={onLoginState}
          onLogout={onLogout}
        />
      </div>
    );
  }
}

export default LoginView;
