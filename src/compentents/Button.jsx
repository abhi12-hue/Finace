import React from 'react';

const Button = ({ text, onClick, blue , disabled }) => {
  return (
    <div>
      <button
        type="button"
        className={`w-full py-2 rounded-lg transition duration-150 
          ${blue ?'bg-indigo-600 hover:bg-indigo-700 text-white' :'border border-blue-700 text-blue-700 hover:bg-blue-100' }`}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
