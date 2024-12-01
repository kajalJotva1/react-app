import React from 'react';
import './SuccessMessage.css'; // Import the CSS file

const SuccessMessage = ({ message, backgroundColor }) => {
  return (
    <div className="success-message" style={{ backgroundColor }}>
      {message}
    </div>
  );
};

export default SuccessMessage;
