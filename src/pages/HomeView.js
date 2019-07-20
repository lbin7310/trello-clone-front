import React, { Component } from 'react';
import HomeBoard from '../components/Home/HomeBoard';
import { Link } from 'react-router-dom';
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
    await fetch(`${API_URL}/users?userName=${userName}`)
      .then(res => res.json())
      .then(usersJson => {
        fetch(`http://localhost:5000/boards?userId=${usersJson[0].id}`)
        .then(res => res.json())
        .then(json => {
          this.setState({
            boards: [...json],
            userId: usersJson[0].id
          })
        })
      }
    );
  }

  onSetBoard = (board) => {
    const { boards } = this.state;
    this.setState({
      boards:[...boards, board]
    })
  }

  render() {
    const { boards, userId } = this.state;
    const { onSetBoard } = this;
    const { userName } = this.props.match.params;
    return (
      <div>
        <div className="home_title">
          <div className="home_nav homeView">
            <Link to="/">Users</Link>
          </div>
        </div>
        <HomeBoard
          userId={userId}
          userName={userName}
          boards={boards}
          onSetBoard={onSetBoard}
        />
      </div>
    )
  }
}

export default HomeView;