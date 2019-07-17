import React, { Component } from 'react';
import "./HomeBoard.css";

class HomeBoard extends Component {
  constructor (props) {
    super (props)
    this.state={
      createBoardToggle: false,
      newBoardTitle: ''
    }
  }

  onCreateModalToggle = () => {
    const { createBoardToggle } = this.state;
    this.setState({
      createBoardToggle: !createBoardToggle,
      newBoardTitle: ''
    })
  }

  onHandleChange = (e) => {
    this.setState({
      [e.target.title]: e.target.value
    })
  }

  onCreate = (fuc) => {
    const { newBoardTitle, createBoardToggle } = this.state;
    if (newBoardTitle !== ''){
      fetch("http://localhost:5000/boards",{
        method: 'POST',
        body: JSON.stringify({
          title: newBoardTitle
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then(response => response.json())
      .then(json => fuc(json));
    }
    this.setState({
      createBoardToggle: !createBoardToggle,
      newBoardTitle: ''
    })
  }
  
  render() {
    const { boards, onSetBoard } = this.props;
    const { createBoardToggle, newBoardTitle } = this.state;
    const { onHandleChange, onCreateModalToggle, onCreate } = this;
    return (
      <div>
        <div>
          <div className="boards">
            {boards.map(board => {
              return (
                <div key={board.id} className="board">
                  {board.title}
                </div>
              )
            })}
            <div className="create-new-board"
              onClick={onCreateModalToggle}
            >
              Create new board
            </div>
            <div className="modal" 
              style={{display: createBoardToggle ? '' : 'none'}}
            >
              <div className="modal-content">
                <span className="close"
                onClick={onCreateModalToggle}
                >
                  &times;
                </span>
                <form>
                  <input 
                    onChange={onHandleChange}
                    type='text' 
                    placeholder="New Board Title"
                    value={newBoardTitle}
                    title="newBoardTitle"
                  />
                </form>
                <button onClick={() => onCreate(onSetBoard)}>Create</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeBoard;
