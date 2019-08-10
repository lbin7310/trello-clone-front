import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { API_URL } from '../../config';
import axios from 'axios'
import './index.scss';

class SignUp extends Component {
  constructor (props) {
    super (props)
    this.state={
      inputEmail: '',
      inputPassword: '',
      checkPassword: '',
      checkCharacter: '',
      emailCharacter: '',
      nickNameCharacter: '',
      resultSignup: '',
      nickName:'',
      emailCheck: false,
      passwordCheck: false,
      nicknameCheck: false,
      toggle: false,
      currentNickName: ''
    }
  }

  componentDidMount() {
    const { onLoginState, onLogout }=this.props
    const accessToken=localStorage.getItem('access-token');

    if ( accessToken !== null){
      axios.post(`${API_URL}/login/check`, {
        token: accessToken
      })
      .then( res => {
        if (res.data.success) {
          this.setState({
            currentNickName: res.data.info.nickname
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

  onChangeInputValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onCheckEmail = async () => {
    const { inputEmail } = this.state;
    const emailValue = inputEmail.split('');
    if ( emailValue.indexOf('@') !== -1 ) {
      await fetch(`${API_URL}/signup/${inputEmail}`)
      .then( res => res.json())
      .then( json => {
          if (json.check === null) {
            this.setState({
              emailCharacter: '사용가능한 이메일입니다.',
              emailCheck: true
            })
          } else {
            this.setState({
              emailCharacter: '이메일이 있습니다.',
              emailCheck: false
            })
          }
        }
      )} else {
      this.setState({
        emailCharacter: '다시 확인 해주세요',
        emailCheck: false
      })
    }
  }

  onCheckCharacter = () => {
    const { inputPassword, checkPassword } = this.state;
    if ( inputPassword === checkPassword ) {
      this.setState({
        checkCharacter: '비밀번호가 맞습니다.',
        passwordCheck: true
      })
    } else if ( checkPassword === '') {
      this.setState({
        checkCharacter: '',
        passwordCheck: false
      })
    } else if ( inputPassword !== checkPassword ){
      this.setState({
        checkCharacter: '비밀번호가 맞지 않습니다.',
        passwordCheck: false
      })
    }
  }

  onSignup = async() => {
    const { inputPassword, 
            checkPassword,
            inputEmail,
            nickName,
            nicknameCheck, 
            passwordCheck, 
            emailCheck,
            toggle } = this.state;
            
    if ( inputEmail !== '' 
      && checkPassword !== '' 
      && inputPassword !== '' 
      && nickName !== '' 
      && nicknameCheck && passwordCheck && emailCheck) {
      await fetch(`${API_URL}/signup/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: inputEmail,
          password: checkPassword,
          nickname: nickName
        })
      })
      .then( res => res.json())
      .then( json => {
        if ( json.result ) {
          this.setState({
            resultSignup: '회원가입이 완료됐습니다.',
            inputEmail: '',
            inputPassword: '',
            checkPassword: '',
            checkCharacter: '',
            emailCharacter: '',
            nickNameCharacter: '',
            nickName:'',
            emailCheck: false,
            passwordCheck: false,
            nicknameCheck: false,
            toggle: !toggle
          })
        } 
      })
    } else {
      this.setState({
        resultSignup: '다시 한번 확인해 주세요.'
      })
    }
  }

  onCheckNickName = async () => {
    const { nickName } = this.state;
    if ( nickName.length >= 4 ) {
      await fetch(`${API_URL}/signup/nickname/${nickName}`)
      .then( res => res.json())
      .then( json => {
          if (json.check === null) {
            this.setState({
              nickNameCharacter: '사용가능합니다.',
              nicknameCheck: true
            })
          } else {
            this.setState({
              nickNameCharacter: '사용중입니다.',
              nicknameCheck: false
            })
          }
        }
    )} else {
      this.setState({
        nickNameCharacter: '4자 이상 적어주세요.',
        nicknameCheck: false
      })
    }
  }

  onClickToggle = () => {
    const { toggle } = this.state;
    this.setState({
      toggle: !toggle
    })
  }

  render() {
    const { inputEmail,
            inputPassword,
            checkPassword,
            checkCharacter,
            emailCharacter,
            resultSignup,
            nickName,
            nickNameCharacter,
            toggle,
            currentNickName } = this.state;

    const { isLogin }=this.props;

    const { onChangeInputValue,
            onCheckCharacter,
            onCheckEmail,
            onSignup,
            onCheckNickName,
            onClickToggle } = this;
    if ( isLogin ) {
      return <Redirect push to={`/user/${currentNickName}`} />
    } else {
      return (
        <div className="signup">
          <div className="signup__email">
            <div className="signup__email-text">이메일</div>
            <form className="signup__email-form">
              <input 
                className="signup__email-input"
                type="text"
                value={inputEmail}
                name="inputEmail"
                onChange={onChangeInputValue}
              />
            </form>
            <button 
              className="signup__email-verify"
              onClick={onCheckEmail}
            >
              중복확인
            </button>
            <div className="signup__checkCharacter">{emailCharacter}</div>
          </div>
          <div className="signup__password">
            <form className="signup__password-form">
              <div className="signup__password-text">비밀번호</div>
              <input 
                className="signup__password-input"
                type="password"
                value={inputPassword}
                name="inputPassword"
                onChange={onChangeInputValue}
              />
              <div className="signup__password-verify-text">비밀번호 확인</div>
              <input type="password"
                value={checkPassword}
                name="checkPassword"
                onChange={onChangeInputValue}
                onKeyUp={onCheckCharacter}
              />
            </form>
            <div className="signup__checkCharacter"
            >{checkCharacter}</div>
          </div>
          <div>
            <div className="signup__nickname-text">Nick Name</div>
            <form>
              <input 
                type="text"
                name="nickName"
                value={nickName}
                onChange={onChangeInputValue}
                onKeyUp={onCheckNickName}
                />
            </form>
            <div className="signup__checkCharacter">{nickNameCharacter}</div>
          </div>
          <div>{resultSignup}</div>
          <div className="signup__buttons">
            <button onClick={onSignup} className="signup__signup-button">가입</button>
            <Link to="login">
              <button>취소</button>
            </Link>
          </div>
          <div>
            <div id="signup_myModal" className="signup_modal"
              style={{display: toggle ? '' : 'none' }}
            >
              <div className="signup_modal-content">
                <p className="signup__result-text">{resultSignup}</p>
                <Link to="login">
                  <button onClick={onClickToggle}>확인</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default SignUp;
