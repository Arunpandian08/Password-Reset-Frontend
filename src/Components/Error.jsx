import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Styles/Error.css'

const Error = () => {
  useEffect(() => {
    const spans = document.querySelectorAll('.Err-status span');
    spans.forEach((span, index) => {
      // Add delay to animation based on index
      span.style.animationDelay = `${index * 0.2}s`;
    });
  }, []);

  return (
    <div className='Error-page circular-gradient'>
      <div>
        <h1 className='Err-status'>
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </h1>
      </div>
      <div className="msg p-5">
        <h1>Oops! PAGE NOT FOUND</h1>
        <p><strong>Page Not Found:</strong> The Requested Response could not be located. Please Check the URL and try again</p>
      </div>
      <div>
        <button className='e-btn m-4'>  <Link to='/'> Home </Link></button>
      </div>
    </div>
  );
};


export default Error;