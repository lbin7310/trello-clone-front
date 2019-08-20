import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config';
import './HomeBoard.scss';

class HomeBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createBoardToggle: false,
      newBoardTitle: '',
      userId: 0,
    };
  }

  onModalToggle = e => {
    const { createBoardToggle } = this.state;
    this.setState({
      createBoardToggle: !createBoardToggle,
      newBoardTitle: '',
      userId: Number(e.target.id),
    });
  };

  onHandleChange = e => {
    this.setState({
      [e.target.title]: e.target.value,
    });
  };

  onCreate = fuc => {
    const { newBoardTitle, createBoardToggle, userId } = this.state;
    if (newBoardTitle !== '') {
      fetch(`${API_URL}/boards/create`, {
        method: 'POST',
        body: JSON.stringify({
          title: newBoardTitle,
          userId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(json => {
          return fuc(json);
        });
    }
    this.setState({
      createBoardToggle: !createBoardToggle,
      newBoardTitle: '',
    });
  };

  render() {
    const { boards, onSetBoard, userName, userId } = this.props;
    const { createBoardToggle, newBoardTitle } = this.state;
    const { onHandleChange, onModalToggle, onCreate } = this;
    return (
      <div>
        <div>
          <div className="boards">
            {boards.map(board => {
              const BOARD_ID = board.id;
              return (
                <Link
                  to={`/${userName}/${board.title}/${BOARD_ID}`}
                  key={BOARD_ID}
                  id={BOARD_ID}
                  className="board"
                >
                  {board.title}
                </Link>
              );
            })}
            <div
              className="create-new-board"
              onClick={onModalToggle}
              role="presentation"
              id={userId}
            >
              Create new board
            </div>
            <div
              className="homeboard__modal"
              style={{ display: createBoardToggle ? '' : 'none' }}
            >
              <div className="homeboard__modal-content">
                <span
                  className="homeboard__close"
                  onClick={onModalToggle}
                  role="presentation"
                >
                  &times;
                </span>
                <form>
                  <input
                    onChange={onHandleChange}
                    type="text"
                    placeholder="New Board Title"
                    value={newBoardTitle}
                    title="newBoardTitle"
                  />
                </form>
                <button
                  className="homeboard__create-button"
                  onClick={() => onCreate(onSetBoard)}
                  type="button"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeBoard;
