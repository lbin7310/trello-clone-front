import React, { Component } from 'react';
import Container from './Container';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      containers,
      onAddContainer,
      getCardTitleAndDescription,
      boardId,
    } = this.props;
    return (
      <div>
        <Container
          boardId={boardId}
          containers={containers}
          onAddContainer={onAddContainer}
          getCardTitleAndDescription={getCardTitleAndDescription}
        />
      </div>
    );
  }
}

export default Board;
