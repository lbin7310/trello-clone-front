import React, { Component } from 'react';
import Board from '../components/Board/Board';
import CardDescription from '../components/Board/CardDescription';
import { Link, Redirect } from 'react-router-dom'
import { API_URL } from '../config';
import { updateBoard, deleteBoard } from '../function/BoardView'
import './BoardView.scss';

class BoardView extends Component {
  constructor (props) {
    super (props)
    this.state={
      containers: [],
      cardTitle: '',
      cardDescription: '',
      cardDescriptionDisplay: true,
      boardId: this.props.match.params.id,
      boardName: this.props.match.params.boardTitle,
      cardId: 0,
      containerId: 0,
      toggle: false
    }
  }

  async componentDidMount() {
    const { boardId } = this.state 
    await fetch(`${API_URL}/container/${boardId}`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          containers: [...json]
        })
      }
    );
  }

  onAddContainer = (container) => {
    this.setState({
      containers: container
    })
  }

  getCardTitleAndDescription = ( title, description, info ) => {
    const { cardDescriptionDisplay } = this.state;
    if (typeof description !== "string") {
      description = '';
    }
    this.setState({
      cardTitle: title,
      cardDescription: description,
      cardDescriptionDisplay: !cardDescriptionDisplay,
      cardId: info.cardId,
    })
  }

  onCreateDescription = ( description, ) => {
    if (typeof description !== "string") {
      description = '';
    }

    this.setState({
      cardDescription: description,
    })
  }

  onToggleDescription = () => {
    const { cardDescriptionDisplay } = this.state;
    this.setState({
      cardDescriptionDisplay: !cardDescriptionDisplay
    })
  }

  onChangeTitle = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    const { boardId, boardName } = this.state;
    e.preventDefault();
    updateBoard(boardId, boardName)
  }

  onBoardNameToggle = (e) => {
    const { toggle }=this.state;
    this.setState({
      toggle: !toggle
    })
  }

  onDeleteBoard = () => {
    const { boardId } = this.state;
    deleteBoard(boardId);
  }

  render() {
    const { userName } = this.props.match.params

    const { isLogin } = this.props;

    const { containers,
            cardTitle,
            cardDescription,
            cardDescriptionDisplay,
            boardId,
            containerId,
            cardId,
            boardName,
            toggle } = this.state;

    const { onAddContainer,
            getCardTitleAndDescription,
            onToggleDescription,
            onCreateDescription,
            onChangeTitle,
            onSubmit,
            onBoardNameToggle,
            onDeleteBoard } = this;

    if ( isLogin ) {
      return (
        <div>
          <div className="Board_Nav">
            <button className="Board_Home-btn">
              <Link to={`/user/${userName}`} >
                Boards
              </Link>
            </button>
            <div className="Board__title"
              onClick={onBoardNameToggle} style={{display: toggle ? 'none' : ''}}
            >
              {boardName}
            </div>
            <form onSubmit={onSubmit} style={{display: !toggle ? 'none' : ''}}>
              <input 
                type="text"
                name="boardName"
                value={boardName}
                onChange={onChangeTitle}
              />
              <button type='submit' onClick={onBoardNameToggle} >수정</button>
            </form>
            <button 
              className="Board__delete-btn"
              onClick={onDeleteBoard}
            >
              <Link to={`/user/${userName}`}>
                Board Delete
              </Link>
            </button>
          </div>
          <Board containers={containers}
            onAddContainer={onAddContainer}
            getCardTitleAndDescription={getCardTitleAndDescription}
            boardId={boardId}
          />
          <div>
            <CardDescription 
              getCardTitleAndDescription={getCardTitleAndDescription}
              containerId={containerId}
              cardId={cardId}
              cardDescriptionDisplay={cardDescriptionDisplay}
              cardTitle={cardTitle}
              cardDescription={cardDescription}
              onToggleDescription={onToggleDescription}
              onCreateDescription={onCreateDescription}
            />
          </div>
        </div>
      )
    } else {
      return <Redirect push to="/login"/>
    }
  }
}

export default BoardView;