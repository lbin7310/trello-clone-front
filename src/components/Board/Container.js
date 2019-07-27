import React, { Component } from 'react';
import ContainerTitle from './Container-title';
import Card from './Card';
import { API_URL } from '../../config';

class Container extends Component {
  constructor (props) {
    super (props)
    this.state={
      containerToggle: true,
      containerTitleToggle: true,
      newContainerTitle: '',
      containerTitle: ''
    }
  }

  onContainerToggle = () => {
    const { containerToggle } = this.state;
    this.setState({
      containerToggle: !containerToggle,
      newContainerTitle: ''
    })
  }

  onAddList = (fuc) => {
    const { newContainerTitle, containerToggle } = this.state;
    const { boardId } = this.props; 
    if ( newContainerTitle !== '') {
      fetch(`${API_URL}/containers/create`, {
        method: 'POST',
          body: JSON.stringify({
            title: newContainerTitle,
            boardId: Number(boardId)
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(json => {
          console.log(json, '<----container.js');
          fuc(json);
          this.setState({
            newContainerTitle: '',
            containerToggle: !containerToggle
          })
        })
    }
  }

  onChangeNewContainerTitle = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    const { containers,
            onAddContainer,
            getCardTitleAndDescription } = this.props

    const { newContainerTitle,
            containerToggle} = this.state;

    const { onAddList,
            onContainerToggle,
            onChangeNewContainerTitle,
            handleSubmit } = this;

    return (
      <div className="containers">
      {containers.map( container => { // containers
        return (
          <div className="container" key={container.id} id={container.id}>
            <ContainerTitle 
              containerid={container.id}
              title={container.title}
            />
            <div>
              <Card 
                containerid={container.id}
                getCardTitleAndDescription={getCardTitleAndDescription}
              />
            </div>
          </div>
        )
      })}
      <div className="Add-Container" >
        <div className="Add-a-list" 
          onClick={onContainerToggle} 
          style={{display: containerToggle ?  '' : 'none' }}
        >
          Add a list
        </div>
        <div style={{display: containerToggle ? 'none' : '' }}>
          <form onSubmit={handleSubmit}>
            <input
              className="container"
              placeholder="New List Title"
              value={newContainerTitle}
              name="newContainerTitle"
              onChange={onChangeNewContainerTitle}
            />
            <div>
              <button onClick={() => onAddList(onAddContainer)}>
                Add list
              </button>
              <button onClick={onContainerToggle}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    )
  }
}

export default Container;