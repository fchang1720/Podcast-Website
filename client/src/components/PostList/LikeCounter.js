// First we import `useState` with React so that we can take advantage of the hook
import React, { useState, useEffect } from 'react';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
const LikeCounter = () => {
  const [count, setCount] = useState(0);
  // To set a state variable using `useState`, we give our variable a name of `count`.
  // We also set the name of the function that will update `count`. We called it `setCount`.
  // useState accepts only one argument - the initial value of the state variable.
 useEffect(() => {
   localStorage.setItem('myCount', count);
 });

  // This is a handler that we will reference in our `onClick` attribute later
  const handleClick = () => {
    setCount((count + 1));
  };

  return (
    <div>
      {/* In our button element, we add a onClick event that invokes our handleClick method */}
      <IconButton aria-label="like" onClick={handleClick} >
              <FavoriteBorderIcon /> 
            </IconButton>
            <p> Likes: {count}</p>
    </div>
  );
}


export default LikeCounter;
