import React, { Component } from 'react';
import "./HomeBoard.css";
import { Link } from 'react-router-dom'

class HomeBoard extends Component {
  constructor (props) {
    super (props)
    this.state={
      createBoardToggle: false,
      newBoardTitle: '',
      userId: 0
    }
  }

  onModalToggle = (e) => {
    console.log(e.target.id);
    const { createBoardToggle } = this.state;
    this.setState({
      createBoardToggle: !createBoardToggle,
      newBoardTitle: '',
      userId: Number(e.target.id)
    })
  }

  onHandleChange = (e) => {
    this.setState({
      [e.target.title]: e.target.value
    })
  }

  onCreate = (fuc) => {
    const { newBoardTitle,
            createBoardToggle,
            userId } = this.state;
    if (newBoardTitle !== ''){
      fetch("http://localhost:5000/boards",{
        method: 'POST',
        body: JSON.stringify({
          title: newBoardTitle,
          userId
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

  onClickBoard = (e) => {
    console.log(e.target.id)
  }
  
  render() {
    const { boards, onSetBoard, userName, userId} = this.props;
    const { createBoardToggle, newBoardTitle } = this.state;
    const { onHandleChange,
            onModalToggle,
            onCreate } = this;
    return (
      <div>
        <div>
          <div className="boards">
            {boards.map(board => {
              const BOARD_ID = board.id;
              return (
                <Link to={`${userName}/board/${BOARD_ID}`} key={BOARD_ID}
                    id={BOARD_ID}
                    className="board"
                  >
                    {board.title}
                </Link>
              )
            })}
            <div className="create-new-board"
              onClick={onModalToggle}
              id={userId}
            >
              Create new board
            </div>
            <div className="modal" 
              style={{display: createBoardToggle ? '' : 'none'}}
            >
              <div className="modal-content">
                <span className="close"
                onClick={onModalToggle}
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
