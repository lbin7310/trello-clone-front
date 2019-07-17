import React, { Component } from 'react';
import './Board.css'

class Board extends Component {
  constructor (props) {
    super (props)
    this.state={
      containerToggle: true
    }
  }

  onCreateContainer = () => {
    
  }

  onContainerToggle = () => {
    const { containerToggle } = this.state;
    this.setState({
      containerToggle: !containerToggle
    })
  }

  render() {
    const { containers } = this.props;
    const { containerToggle } = this.state;
    const { onContainerToggle } = this; 
    return (
      <div>
        <div className="containers">
          {containers.map( container => {
            return (
              <div className="container" key={container.id}>
                {container.title}
              </div>
            )
          })}
          <div className="Add-Container" >
            <div className="Add-a-list" onClick={onContainerToggle} style={{display: containerToggle ?  '' : 'none' }}>
              Add a list
            </div>
            <div style={{display: containerToggle ? 'none' : '' }}>
              <input className="container" placeholder="New List Title"/>
              <button onClick={onContainerToggle}>Add List</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Board;
