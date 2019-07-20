import React, { Component } from 'react';
import Card from './Card';
import { API_URL } from '../../config';

class Container extends Component {
  constructor (props) {
    super (props)
    this.state={
      containerToggle: true,
      newContainerTitle: '',
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
      fetch(`${API_URL}/containers`, {
        method: 'POST',
          body: JSON.stringify({
            title: newContainerTitle,
            boardId: Number(boardId)
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
        .then(res => res.json())
        .then(json => {
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

  render() {
    const { containers,
            onAddContainer,
            getCardTitleAndDescription } = this.props

    const { newContainerTitle,
            containerToggle } = this.state;

    const { onChangeNewContainerTitle,
            onAddList,
            onContainerToggle } = this;

    return (
      <div className="containers">
      {containers.map( container => { // containers
        return (
          <div className="container" key={container.id}>
            <div className="container-title">{container.title}</div>
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
          <form>
            <input
              className="container"
              placeholder="New List Title"
              value={newContainerTitle}
              name="newContainerTitle"
              onChange={onChangeNewContainerTitle}
            />
          </form>
          <div>
            <button onClick={() => onAddList(onAddContainer)}>
              Add list
            </button>
            <button onClick={onContainerToggle}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Container;