import React, { Component } from 'react';
import { updateContainer } from '../../function/Container'

class ContainerTitle extends Component {
  constructor (props){
    super (props)
    this.state={
      containerId: 0,
      containerTitle: '',
      toggle: false
    }
  }

  componentDidMount() {
    const { title, containerid } = this.props
    this.setState({
      containerTitle: title,
      containerId: containerid
    })
  }
  
  onToggle = (e) => {
    const { toggle } = this.state;
    this.setState({
      toggle: !toggle
    })
  }

  onSubmit = (e) => {
    const { toggle, containerId, containerTitle } = this.state;
    e.preventDefault();
    updateContainer(containerId, containerTitle);
    this.setState({
      toggle: !toggle
    })
  }

  onModifyTitle = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { toggle, 
            containerTitle,
            containerId }=this.state;

    const { onModifyTitle,
            onSubmit,
            onToggle }=this;

    return (
      <div>
        <div className="container-title"
          onClick={onToggle} style={{display: toggle ? 'none' : ''}}
        >{containerTitle}
        </div>
        <div 
          className="container__title-input"
          style={{display: toggle ? '' : 'none'}}
        >
          <form 
            id={containerId}
            onSubmit={onSubmit}
            >
            <input 
              type="text"
              name="containerTitle"
              value={containerTitle}
              onChange={onModifyTitle}
            />
            <button type='submit'>수정</button>
          </form>
        </div>
      </div>
    )
  }
}

export default ContainerTitle;