import React from 'react';
import '../../../styles/custom-checkbox.css';

const CustomCheckbox = ({ label, id, darkMode, disabled, checked, onChange }) => {
  return (
    <div className="checkbox-wrapper-1">
      <input
        id={id}
        type="checkbox"
        className={`substituted ${darkMode ? 'dark' : ''}`}
        aria-hidden="true"
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default CustomCheckbox;