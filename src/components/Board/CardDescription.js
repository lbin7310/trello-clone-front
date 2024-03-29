import React, { Component } from 'react';
import axios from 'axios';
import { updateDescription } from '../../function/Description';
import { API_URL } from '../../config';
import './CardDescription.scss';

class CardDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      toggle: true,
      cardId: 0,
    };
  }

  componentDidMount() {
    const { cardDescription } = this.props;
    this.setState({
      description: cardDescription,
    });
  }

  onDescriptionChage = e => {
    this.setState({
      description: e.target.value,
    });
  };

  onToggle = e => {
    const { toggle } = this.state;
    const splited = e.target.className.split(' ');
    const CARD_ID = splited[splited.length - 1];
    this.setState({
      toggle: !toggle,
      cardId: Number(CARD_ID),
    });
  };

  onOkToggle = () => {
    const { toggle, description, cardId } = this.state;
    const { onCreateDescription } = this.props;
    axios.get(`${API_URL}/description/${cardId}`).then(res => {
      if (res.data === null && description !== '') {
        axios
          .post(`${API_URL}/description/create`, {
            title: description,
            cardId,
          })
          .then(res => {
            const { title } = res.data;
            onCreateDescription(title);
            this.setState({
              description: '',
              toggle: !toggle,
            });
          });
      } else {
        updateDescription(res.data.id, description).then(() => {
          onCreateDescription(description);
          this.setState({
            description: '',
            toggle: !toggle,
          });
        });
      }
    });
  };

  onCancelToggle = () => {
    const { toggle } = this.state;
    this.setState({
      description: '',
      toggle: !toggle,
    });
  };

  getDescription = () => {
    const { toggle } = this.state;
    const { cardId } = this.props;
    axios.get(`${API_URL}/description/${cardId}`).then(res => {
      if (res.data !== null) {
        this.setState({
          description: res.data.title,
          toggle: !toggle,
        });
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    const {
      cardId,
      cardTitle,
      cardDescription,
      cardDescriptionDisplay,
      onToggleDescription,
    } = this.props;
    const { description, toggle } = this.state;
    const {
      onDescriptionChage,
      onToggle,
      onOkToggle,
      onCancelToggle,
      getDescription,
      handleSubmit,
    } = this;
    return (
      <div>
        <div
          className="description__modal"
          style={{ display: cardDescriptionDisplay ? 'none' : '' }}
        >
          <div className="description__modal-content">
            <span
              className="description__close"
              onClick={onToggleDescription}
              role="presentation"
            >
              &times;
            </span>
            <div className="description__contents">
              <div className="description__cardTitle">{cardTitle}</div>
              <div
                className="description__cardDescription"
                onClick={getDescription}
                style={{ display: toggle ? '' : 'none' }}
                role="presentation"
              >
                {cardDescription}
              </div>
              <div className="description_write-container">
                <form onSubmit={handleSubmit}>
                  <textarea
                    className="description_write"
                    type="text"
                    placeholder="내용을 작성하세요."
                    value={description}
                    onChange={onDescriptionChage}
                    style={{ display: toggle ? 'none' : '' }}
                  />
                  <button
                    className={`description_btn containerId ${cardId}`}
                    onClick={onToggle}
                    style={{ display: toggle ? '' : 'none' }}
                    type="button"
                  >
                    Write
                  </button>
                  <div
                    className="description__btns"
                    style={{ display: toggle ? 'none' : '' }}
                  >
                    <button
                      className="description__btn-ok"
                      onClick={onOkToggle}
                      type="button"
                    >
                      OK
                    </button>
                    <button
                      className="description__btn-cancel"
                      onClick={onCancelToggle}
                      type="button"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardDescription;
