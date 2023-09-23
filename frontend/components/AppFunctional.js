import React,{ useState, useEffect } from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  const [index, setIndex] = useState(initialIndex);
  const [error, setError] = useState('');

  useEffect(() => {
    // This effect will run when the index changes
    // Handle any side effects or validations related to index here
  }, [index]);

  function getXY(idx) {
    switch(idx) {
      case 0:
        return "(1,1)";
      case 1:
        return "(2,1)";
      case 2:
        return "(3,1)";
      case 3:
        return "(1,2)";
      case 4:
        return "(2,2)";
      case 5:
        return "(3,2)";
      case 6:
        return "(1,3)";
      case 7:
        return "(2,3)";
      case 8:
        return "(3,3)";   
    }
  }


  function getXYMessage(idx) {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const getCoords = getXY(index);
    return `Coordinates ${getCoords}`

  }

  function reset() {
    // Use this helper to reset all states to their initial values.
  }

  function getNextIndex(direction) {
    // Calculate the next index based on the direction
    const newIndex =
      direction === 'up'
        ? index - 3
        : direction === 'down'
        ? index + 3
        : direction === 'left'
        ? index - 1
        : direction === 'right'
        ? index + 1
        : index;

    // Check if the new index is within bounds (0 to 8)
    if (newIndex >= 0 && newIndex <= 8) {
      setIndex(newIndex);
      setError('');
    } else {
      setError('Invalid move');
    }
  }
  function move(evt) {
    
  }

  function onChange(evt) {
    
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }


  // (1, 1) (2, 1) (3, 1)
  // (1, 2) (2, 2) (3, 2)
  // (1, 3) (2, 3) (3, 3)


  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage(index)}</h3>
        <h3 id="steps">You moved 0 times</h3>
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
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button onClick={() => getNextIndex('left')} id="left">LEFT</button>
        <button onClick={() => getNextIndex('up')} id="up">UP</button>
        <button onClick={() => getNextIndex('right')} id="right">RIGHT</button>
        <button onClick={() => getNextIndex('down')} id="down">DOWN</button>
        <button onClick={() => reset()} id="reset">reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
