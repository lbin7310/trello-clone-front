import React, { Component } from 'react';
import HomeBoard from '../components/Home/HomeBoard';
import './HomeView.css'

class HomeView extends Component {
  constructor () {
    super ()
    this.state={
      boards: []
    }
  }

  async componentDidMount() {
    await fetch('http://localhost:5000/boards')
      .then(response => response.json())
      .then(json => {
        this.setState({
          boards: [...json]
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
    const { boards } = this.state;
    const { onSetBoard } = this;
    return (
      <div>
        <div className="home_title">
          HomeView
        </div>
        <HomeBoard boards={boards} onSetBoard={onSetBoard}/>
      </div>
    )
  }
}

export default HomeView;