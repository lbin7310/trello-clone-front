import React, { Component } from "react";
import axios from "axios";
import { updateDescription } from '../../function/Description'
import { API_URL } from '../../config'
import "./CardDescription.scss";

class CardDescription extends Component {
  constructor(props) {
    super(props)
    this.state={ 
      description: '',
      toggle: true,
      cardId: 0,
      containerId: 0,
      modifyToggle: false
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
    let splited = e.target.className.split(' ');
    const CARD_ID = splited[splited.length-1]
      this.setState({
        toggle: !toggle,
        cardId: Number(CARD_ID),
    })
  }

  onOkToggle = () => {
    const { toggle, description, cardId} = this.state
    const { onCreateDescription } = this.props;
    axios.get(`${API_URL}/description/${cardId}`)
    .then( res => {
      if ( res.data === null && description !== '') {
        axios.post(`${API_URL}/description/create`, {
          title: description,
          cardId: cardId
        })
        .then( res => {
          const title = res.data.title
          onCreateDescription(title);
          this.setState({
            description: '',
            toggle: !toggle
          })
        })
      } else {
        updateDescription(res.data.id, description)
        .then( () => {
          onCreateDescription(description);
          this.setState({
            description: '',
            toggle: !toggle
          })
        })
      }
    })
  }

  onCancelToggle = () => {
    const { toggle } = this.state;
    this.setState({
      description: '',
      toggle: !toggle
    })
  }

  getDescription = () => {
    const { toggle } = this.state;
    const { cardId } = this.props;
    axios.get(`${API_URL}/description/${cardId}`)
    .then( res => {
      this.setState({
        description: res.data.title,
        toggle: !toggle
      })
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }
  render() {
    const { 
            cardId,
            cardTitle,
            cardDescription,
            cardDescriptionDisplay,
            onToggleDescription } = this.props;
    const { description,
            toggle,
            modifyToggle } = this.state;
    const { onDescriptionChage,
            onToggle,
            onOkToggle,
            onCancelToggle,
            getDescription,
            handleSubmit } = this;
    return (
      <div>
        <div className="description__modal" style={{display: cardDescriptionDisplay ? "none" : ""}}>
          <div className="description__modal-content">
            <span className="description__close" onClick={onToggleDescription}>&times;</span>
            <div>{cardTitle}</div>
            <div>
              <div onClick={getDescription}
                style={{display: toggle ? '' : 'none' }}
              >
              {cardDescription}
              </div>
              <div className="description_write-container">
                <form onSubmit={handleSubmit}>
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
                  <button style={{display: modifyToggle ? '' : 'none'}}>수정</button>
                  <div style={{display: toggle ? 'none' : ''}}>
                    <button onClick={onOkToggle} >OK</button>
                    <button onClick={onCancelToggle}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CardDescription