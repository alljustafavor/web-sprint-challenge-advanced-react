import React from 'react'
import axios from 'axios'
// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const _URL_ = `http://localhost:9000/api/result`

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  constructor() {
    super();
    this.state = initialState;
  }
  


  getXY = (idx) => {
    switch(idx) {
      case 0:
        return {x: 1, y: 1};
      case 1:
        return {x: 2, y: 1};
      case 2:
        return {x: 3, y: 1};
      case 3:
        return {x: 1, y: 2};
      case 4:
        return {x: 2, y: 2};
      case 5:
        return {x: 3, y: 2};
      case 6:
        return {x: 1, y: 3};
      case 7:
        return {x: 2, y: 3};
      case 8:
        return {x: 3, y: 3};   
    }
  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const coords = this.getXY(this.state.index);
    return `Coordinates (${coords.x}, ${coords.y})`
  }

  reset = () => {
    this.setState({
      ...this.state,
        index: initialIndex,
        message: initialMessage,
        steps: initialSteps
    })
  }

  getNextIndex = (direction) => {
    const { index } = this.state;
    
    // Define the maximum index value (assuming a 3x3 grid)
    const maxIndex = 8;
  
    let newIndex;
  
    switch (direction) {
      case 'up':
        newIndex = index - 3;
        break;
      case 'down':
        newIndex = index + 3;
        break;
      case 'left':
        if (index % 3 !== 0) {
          newIndex = index - 1;
        }
        break;
      case 'right':
        if (index % 3 !== 2) {
          newIndex = index + 1;
        }
        break;
      default:
        break;
    }
  
    // Check if newIndex is within bounds (between 0 and maxIndex)
    if (newIndex >= 0 && newIndex <= maxIndex) {
      this.setState((prevState) => ({
        ...prevState,
        steps: prevState.steps + 1,
        index: newIndex,
        message: '',
      }));
    } else {
      this.setState({ message: 'Invalid Move...' });
    }
  };

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    let { value } = evt.target
    this.setState({
      ...this.state,
        email: value
    })
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault()
    const coords = this.getXY(this.state.index);
    axios.post(_URL_,{
      ...this.state,
        x: coords.x,
        y: coords.y
    })
    .then(res => {
      this.setState({
        ...this.state,
          message: res.data.message
      })
    })
    .catch(err => {
      this.setState({
        ...this.state,
          message: err.response.data.message
      })
    })
  }

  render() {
    console.log('render');
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates ${this.getXYMessage(this.state.index)}`}</h3>
          <h3 id="steps">{`You moved ${this.state.steps} times`}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={() => this.getNextIndex('left')} id="left">LEFT</button>
          <button onClick={() => this.getNextIndex('up')} id="up">UP</button>
          <button onClick={() => this.getNextIndex('right')} id="right">RIGHT</button>
          <button onClick={() => this.getNextIndex('down')} id="down">DOWN</button>
          <button onClick={() => this.reset()} id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}> 
          <input onChange={this.onChange} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
