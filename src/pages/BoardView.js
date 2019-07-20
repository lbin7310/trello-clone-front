import React, { Component } from 'react';
import Board from '../components/Board/Board';
import CardDescription from '../components/Board/CardDescription';
import { Link } from 'react-router-dom'
import { API_URL } from '../config';
import './BoardView.css';

class BoardView extends Component {
  constructor (props) {
    super (props)
    this.state={
      containers: [],
      cardTitle: '',
      cardDescription: '',
      cardDescriptionDisplay: true,
      boardId: this.props.match.params.id,
      cardId: 0,
      containerId: 0
    }
  }

  async componentDidMount() {
    const { boardId } = this.state 
    await fetch(`${API_URL}/containers?boardId=${boardId}`)
      .then(response => response.json())
      .then(json => {
        this.setState({
          containers: [...json]
        })
      }
    );
  }

  onAddContainer = (container) => {
    const { containers } = this.state;
    this.setState({
      containers: [...containers, container]
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
      containerId: info.containerId
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

  render() {
    const { userName } = this.props.match.params

    const { containers,
            cardTitle,
            cardDescription,
            cardDescriptionDisplay,
            boardId,
            containerId,
            cardId } = this.state;

    const { onAddContainer,
            getCardTitleAndDescription,
            onToggleDescription,
            onCreateDescription } = this;
    return (
      <div>
        <div className="Board_Nav">
          <button className="Board_Home-btn">
            <Link to={`/${userName}`} >
              Boards
            </Link>
          </button>
          <div className="boardView">
        </div>
          BoardView
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
  }
}

export default BoardView;