import React, { Component } from 'react';
import { API_URL } from '../../config.js'
import './Card.css';

class Card extends Component {
  constructor(){
    super()
    this.state={
      cards: [],
      cardToggle: true,
      newCardTitle: '',
      containerId: 0
    }
  }
  
  async componentDidMount(){
    await fetch(`${API_URL}/cards`)
    .then(res => res.json())
    .then(json => {
      this.setState({
        cards: [...json],
      })
    });
  }

  onCreateCard = () => {
    const { newCardTitle,
            cards,
            cardToggle,
            containerId } = this.state;
    if ( newCardTitle !== '' ) {
      fetch(`${API_URL}/cards`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: newCardTitle,
          containerId
        })
      })
      .then(res => res.json())
      .then(json => 
        this.setState({
          cards: [...cards, json],
          newCardTitle: '',
          cardToggle: !cardToggle
        })
      );
    }
  }

  onNewCardTitle = (e) => {
    this.setState({
      newCardTitle: e.target.value
    })
  }

  onCardToggle = () => {
    const { cardToggle } = this.state;
    const { containerid } = this.props;
    this.setState({
      cardToggle: !cardToggle,
      containerId: containerid,
      newCardTitle: ''
    })
  }

  onClickCard = (e, title) => {
    const { getCardTitleAndDescription } = this.props
    const descriptionInfo = {
      cardId: Number(e.target.id),
      containerId: Number(e.target.className.split(' ')[1])
    }
    fetch(`${API_URL}/description?cardId=${descriptionInfo.cardId}&containerId=${descriptionInfo.containerId}`)
    .then(res => res.json())
    .then(json => {
      const description = json.length === 0 ? {} : json[0].description
      getCardTitleAndDescription(title, description, descriptionInfo)
    });
  }

  render() {
    const { onCardToggle, onNewCardTitle, onCreateCard, onClickCard } = this;
    const { cards, cardToggle, newCardTitle } = this.state;
    const { containerid } = this.props;
    return (
      <div className="cards">
        { cards.map(card => {
          const CARD_TITLE = card.title;
          const CARD_ID = card.id;
          if (card.containerId === containerid){
            return (
              <div className={`card ${containerid}`} 
                key={CARD_ID}
                id={CARD_ID}
                onClick={ e => onClickCard(e, CARD_TITLE)}
              >
                {CARD_TITLE}
              </div>
            )
          }
          return '';
        })}
        <div className="card-Add"
          onClick={onCardToggle}
          style={{display: cardToggle ?  '' : 'none' }}
        > + Add another card</div>
        <div 
          className="createOrCancel"
          style={{display: cardToggle ? 'none' : '' }}>
          <input  
            className="card"
            placeholder="Add new card"
            value={newCardTitle}
            name='newCardTtile'
            onChange={onNewCardTitle}
          />
          <div>
            <button onClick={onCreateCard}>
              Add card
            </button>
            <button onClick={onCardToggle}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Card;