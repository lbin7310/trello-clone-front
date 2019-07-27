import React, { Component } from 'react';
import HomeBoard from '../components/Home/HomeBoard';
import { Redirect } from 'react-router-dom';
import { API_URL } from '../config';
import './HomeView.css'

class HomeView extends Component {
  constructor () {
    super ()
    this.state={
      boards: [],
      userId: 0
    }
  }

  async componentDidMount() {
    const { userName } = this.props.match.params;
    await fetch(`${API_URL}/user/${userName}`)
      .then(res => res.json())
      .then(usersJson => {
        if ( usersJson !== null ) {
          fetch(`${API_URL}/board/${usersJson.id}`)
          .then(res => res.json())
          .then(json => {
            this.setState({
              boards: [...json],
              userId: usersJson.id
            })
          })
        } else {
          localStorage.removeItem('access-token');
        }
      }
    );
  }

  onSetBoard = (board) => {
    this.setState({
      boards: board
    })
  }

  render() {
    const { boards, userId } = this.state;
    const { onSetBoard } = this;
    const { userName } = this.props.match.params;
    const { isLogin } = this.props;
    if ( isLogin ) {
      return (
        <div>
          <HomeBoard
            userId={userId}
            userName={userName}
            boards={boards}
            onSetBoard={onSetBoard}
          />
        </div>
      )
    } else {
      return <Redirect push to="/login" />
    }
  }
}

export default HomeView;