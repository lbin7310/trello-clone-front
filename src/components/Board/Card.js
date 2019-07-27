import React, { Component } from 'react';
import { API_URL } from '../../config.js';
import { isActiveCard } from '../../function/Card'
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
      const activeCard = json.filter( card => card.isActive === false );
      this.setState({
        cards: [...activeCard],
      })
    });
  }

  onCreateCard = () => {
    const { newCardTitle,
            cardToggle,
            containerId } = this.state;
    if ( newCardTitle !== '' ) {
      fetch(`${API_URL}/cards/create`,{
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
          cards: json,
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
    fetch(`${API_URL}/description/${descriptionInfo.cardId}`)
    .then(res => res.json())
    .then(json => {
      const description = json === null ? {} : json.title
      getCardTitleAndDescription(title, description, descriptionInfo)
    });
  }

  onIsActive = (e, active) => {
    isActiveCard(e.target.id, active);
    
  }

  render() {
    const { onCardToggle, onNewCardTitle, onCreateCard, onClickCard,
            onIsActive } = this;
    const { cards, cardToggle, newCardTitle } = this.state;
    const { containerid } = this.props;
    return (
      <div className="cards">
        { cards.map(card => {
          const CARD_TITLE = card.title;
          const CARD_ID = card.id;
          if (card.containerId === containerid){
            return (
              <div className="allCard" key={CARD_ID}>
                <div className={`card ${containerid}`} 
                  id={CARD_ID}
                  onClick={ e => onClickCard(e, CARD_TITLE)}
                >
                  {CARD_TITLE}
                </div>
                <CardIsActive onIsActive={onIsActive} cardid={CARD_ID} isActive={card.isActive}/>
              </div>
            )
          }
          return ''
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

class CardIsActive extends Component {
  constructor (props) {
    super(props)
    this.state={
      isActive: false
    }
  }

  componentDidMount(){
    const { isActive } = this.props;
    this.setState({
      isActive: isActive
    })
  }

  render () {
    const { cardid, onIsActive } = this.props
    return (
      <div>
        <i className="fa fa-check-square" 
          id={cardid}
          onClick={onIsActive}></i>
      </div>
    )
  }
  
}

export default Card;