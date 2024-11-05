import React, { useState } from 'react';

const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4; 

export default function AppFunctional(props) {
  const [index, setIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);



  function getXY() {
    const x = (index % 3) + 1;
    const y = Math.floor(index / 3) + 1;
    return { x, y };
  }

  
  function getXYMessage() {
    const { x, y } = getXY();
    return `Coordinates (${x}, ${y})`;
  }


  function reset() {
    setIndex(initialIndex);
    setSteps(initialSteps);
    setMessage(initialMessage);
    setEmail(initialEmail);
  }


  function getNextIndex(direction) {
    const moves = {
      up: -3,
      down: 3,
      left: -1,
      right: 1,
    };
    const newIndex = index + moves[direction];

   
    if (direction === 'left' && index % 3 === 0) return index;
    if (direction === 'right' && index % 3 === 2) return index;
    if (direction === 'up' && index < 3) return index;
    if (direction === 'down' && index > 5) return index;

    return newIndex;
  }


  function move(evt) {
    const direction = evt.target.id;
    const nextIndex = getNextIndex(direction);
    
    if (nextIndex !== index) {
        setIndex(nextIndex);
        setSteps(steps + 1);
        setMessage(''); 
    } else {
        switch (direction) {
            case 'up':
                setMessage("You can't go up");
                break;
            case 'down':
                setMessage("You can't go down");
                break;
            case 'left':
                setMessage("You can't go left");
                break;
            case 'right':
                setMessage("You can't go right");
                break;
        }
    }
}


  function onChange(evt) {
    setEmail(evt.target.value);
  }

  
  async function onSubmit(evt) {
    evt.preventDefault();
    
    if (!email) {
        setMessage('Ouch: email is required');
        return;
    }

     const emailParts = email.split('@');
    if (emailParts.length !== 2 || !emailParts[1].includes('.')) {
        setMessage('Ouch: email must be a valid email');
        return;
    }

    const { x, y } = getXY(); 
    const code = (((x + 1) * (y + 2)) * (steps + 1)) + email.length;
    const username = emailParts[0]; 

    const submissionData = {
        x: x,
        y: y,
        steps: steps,
        email: email
    };

    console.log('Submission Data:', submissionData);

    try {
        if (email === 'foo@bar.baz') {
            setMessage(`${email} failure #${code}`);
        } else {
            setMessage(`${username} win #${code}`);
        }

        
        setEmail('');
    } catch (error) {
        setMessage('Failed to submit email. Please try again.');
    }
}



  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} {steps === 1 ? 'time' : 'times'}</h3>
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
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="type email"
          value={email}
          onChange={onChange}
        />
        <input id="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}