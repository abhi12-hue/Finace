import React from 'react';

function Input({ label, state, placeholder, setState, type = "text" }) {
  return (
    <div className="flex flex-col mb-4">
      <label className="text-sm font-medium mb-1 text-gray-700">{label}</label>
      <input
        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out
        md:p-3 text-base"
        value={state}
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
        type={type}
      />
    </div>
  );
}

export default Input;
