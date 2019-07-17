import React, { Component } from 'react';
import Board from '../components/Board/Board';
import './BoardView.css';

class BoardView extends Component {
  constructor () {
    super ()
    this.state={
      containers: []
    }
  }

  async componentDidMount() {
    await fetch('http://localhost:5000/containers')
      .then(response => response.json())
      .then(json => {
        this.setState({
          containers: [...json]
        })
      }
    );
  }

  render() {
    const { containers } = this.state;
    return (
      <div>
        <div className="boardView">
          BoardView
        </div>
        <Board containers={containers}/>
      </div>
    )
  }
}

export default BoardView;