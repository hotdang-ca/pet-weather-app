import React from 'react';

const PrimaryButton = ({ title, onClick, additionalStyles, disabled }) => (
  <button
    id='primaryButton'
    className='primary-button'
    onClick={onClick}
    style={additionalStyles}
    disabled={disabled}
  >
    {title}
  </button>
);

export { PrimaryButton };
