import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { HomeView, BoardView, UserView, SignUpView, LoginView } from './pages';
import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
    };
  }

  onLoginState = () => {
    this.setState({
      isLogin: true,
    });
  };

  onLogout = () => {
    localStorage.removeItem('access-token');
    this.setState({
      isLogin: false,
    });
  };

  render() {
    const { isLogin } = this.state;
    const { onLoginState, onLogout } = this;
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/" exact render={() => <UserView isLogin={isLogin} />} />
          <Route
            path="/user/:userName"
            exact
            render={props => <HomeView {...props} isLogin={isLogin} />}
          />
          <Route
            path="/:userName/:boardTitle/:id"
            exact
            render={props => <BoardView {...props} isLogin={isLogin} />}
          />
          <Route
            path="/signup"
            exact
            render={props => (
              <SignUpView
                {...props}
                isLogin={isLogin}
                onLoginState={onLoginState}
                onLogout={onLogout}
              />
            )}
          />
          <Route
            path="/login"
            exact
            render={props => (
              <LoginView
                {...props}
                isLogin={isLogin}
                onLoginState={onLoginState}
                onLogout={onLogout}
              />
            )}
          />
        </div>
        <div className="logout" style={{ display: isLogin ? '' : 'none' }}>
          <button type="button" className="logout__button" onClick={onLogout}>
            로그아웃
          </button>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
