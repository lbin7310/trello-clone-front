import React, { Component } from "react";
import { API_URL } from '../../config'

class CardDescription extends Component {
  constructor(props) {
    super(props)
    this.state={ 
      description: '',
      toggle: true,
      cardId: 0,
      containerId: 0
    }
  }

  componentDidMount () {
    const { cardDescription } = this.props;
    this.setState({
      description: cardDescription
    })
  }
  onDescriptionChage = (e) => {
    this.setState({
      description: e.target.value
    })
  }

  onToggle = (e) => {
    const { toggle } = this.state;
    const { cardDescription } = this.props
    let splited = e.target.className.split(' ');
    const CARD_ID = splited[splited.length-1]
    // const CONTAINER_ID = splited[splited.length-2]
    if ( cardDescription === ''){
      this.setState({
        toggle: !toggle,
        cardId: Number(CARD_ID),
        // containerId: Number(CONTAINER_ID)
      })
    }
  }

  onOkToggle = () => {
    const { toggle, description, cardId, containerId} = this.state
    const { onCreateDescription } = this.props 
    if ( description !== '' ) {
      fetch(`${API_URL}/description/create`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: description,
          cardId: cardId,
          // containerId: containerId
        })
      })
      .then( res => res.json())
      .then( json => {
        onCreateDescription(json.title)
        this.setState({
          description: '',
          toggle: !toggle
        })
      })
    }
  }

  onCancelToggle = () => {
    const { toggle } = this.state;
    this.setState({
      description: '',
      toggle: !toggle
    })
  }

  render() {
    const { 
            // containerId,
            cardId,
            cardTitle,
            cardDescription,
            cardDescriptionDisplay,
            onToggleDescription } = this.props;
    const { description,
            toggle } = this.state;
    const { onDescriptionChage,
            onToggle,
            onOkToggle,
            onCancelToggle } = this;
    return (
    <div className="modal" style={{display: cardDescriptionDisplay ? "none" : ""}}>
      <div className="modal-content">
        <span className="close" onClick={onToggleDescription}>&times;</span>
        <p>{cardTitle}</p>
        <div>
          <div>{cardDescription}</div>
          <div className="description_write-container">
            <textarea className="description_write"
              type="text"
              placeholder="내용을 작성하세요."
              value={description}
              onChange={onDescriptionChage}
              style={{display: toggle ? 'none' : ''}}
            />
            <button className={`description_btn containerId ${cardId}`}
              onClick={onToggle}
              style={{display: toggle ? '' : 'none'}}
            >
              Write
            </button>
            <div style={{display: toggle ? 'none' : ''}}>
              <button onClick={onOkToggle} >OK</button>
              <button onClick={onCancelToggle}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default CardDescription