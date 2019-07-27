import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { API_URL } from '../../config';

class Login extends Component {
  constructor () {
    super ()
    this.state={
      inputEmail: '',
      inputPassword: '',
      loginResult: '',
      nickName: ''
    }
  }

  componentDidMount(){
    const { onLoginState, onLogout }=this.props;
    const accessToken = localStorage.getItem('access-token');
    if ( accessToken !== null){
      axios.post(`${API_URL}/login/check`, {
        token: accessToken
      })
      .then( res => {
        if (res.data.success) {
          this.setState({
            nickName: res.data.info.nickname
          })
          onLoginState();
        } else if (!res.data.success) {
          onLogout();
        }
      });
    } else {
      onLogout()
    }
  }

  onLogin = () => {
    const { inputEmail, inputPassword } = this.state;
    const { onLoginState }=this.props;
    if ( inputEmail !== '' && inputPassword !== '') {
      axios.post(`${API_URL}/login/attempt`,{
        email: inputEmail,
        password: inputPassword
      })
      .then( res => {
        console.log(res);
        if( res.data !== '' ) {
          localStorage.setItem('access-token', res.data.token);
          this.setState({
            nickName: res.data.nickname
          })
          onLoginState();
        }
      })
      .catch( error => {
        this.setState({
          loginResult: '이메일 혹은 비밀번호를 확인하세요.'
        })
      });
    } else {
      this.setState({
        loginResult: '이메일 혹은 비밀번호를 확인하세요.'
      })
    }
  }

  onChangeInputValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { inputEmail, inputPassword, nickName, loginResult } = this.state;
    const { onChangeInputValue,
            onLogin }=this;
    const { isLogin }=this.props;
    if ( isLogin ) {
      return <Redirect push to={`/user/${nickName}`}/>
    } else {
      return (
        <div>
          <div>
            <form>
              <div>이메일</div>
              <input 
                type="text"
                value={inputEmail}
                name="inputEmail"
                onChange={onChangeInputValue}
              />
              <div>비밀번호</div>
              <input 
                type="text"
                value={inputPassword}
                name="inputPassword"
                onChange={onChangeInputValue}
              />
            </form>
          </div>
          <div>
            <button onClick={onLogin}>로그인</button>
            <Link to="/signup">
              <button>회원가입</button>
            </Link>
          </div>
          <div>{loginResult}</div>
        </div>
      )
    }
  }
}

export default Login;