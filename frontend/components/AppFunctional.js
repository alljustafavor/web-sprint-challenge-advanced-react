import React,{ useState, useEffect } from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const _URL_ = `http://localhost:9000/api/result`
const minIndex = 0;
const maxIndex = 8;

export default function AppFunctional(props) {
  const [index, setIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // This effect will run when the index changes
    // Handle any side effects or validations related to index here
  }, [index, email]);

  function getXY(idx) {
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


  function getXYMessage(idx) {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const coords = getXY(index);
    return `Coordinates (${coords.x}, ${coords.y})`

  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setIndex(initialIndex);
    setSteps(initialSteps)
    setEmail(initialEmail)
    setMessage(initialMessage)
  }

  const getNextIndex = (direction) => {
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

    if (newIndex >= minIndex && newIndex <= maxIndex) {
      setSteps(steps + 1);
      setIndex(newIndex);
      setMessage('');
    } else {
      let errorMessage = '';

      switch (direction) {
        case 'up':
          errorMessage = "You can't go up";
          break;
        case 'down':
          errorMessage = "You can't go down";
          break;
        case 'left':
          errorMessage = "You can't go left";
          break;
        case 'right':
          errorMessage = "You can't go right";
          break;
        default:
          errorMessage = '';
      }

      setMessage(errorMessage);
    }
  }

  function onChange(evt) {
    let { value } = evt.target
    setEmail(value)
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    const coords = getXY(index);
    evt.preventDefault()
    axios.post(_URL_,
      {
        steps: steps,
        x: coords.x,
        y: coords.y,
        email: email
      })
      .then(res => {
        setMessage(res.data.message);
        setEmail('')
      })
      .catch(err => setMessage(err.response.data.message))
  }


  // (1, 1) (2, 1) (3, 1)
  // (1, 2) (2, 2) (3, 2)
  // (1, 3) (2, 3) (3, 3)


  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage(index)}</h3>
        <h3 id="steps">{`You moved ${steps} ${steps === 1 ? 'time' : 'times'}`}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={() => getNextIndex('left')} id="left">LEFT</button>
        <button onClick={() => getNextIndex('up')} id="up">UP</button>
        <button onClick={() => getNextIndex('right')} id="right">RIGHT</button>
        <button onClick={() => getNextIndex('down')} id="down">DOWN</button>
        <button onClick={() => reset()} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} id="email" type="email" value={email} placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
