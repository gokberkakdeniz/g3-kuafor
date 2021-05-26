import React from "react";
import PropTypes from "prop-types";

const ComboBox = ({ className, onClick, placeholder, values }) => {
  return (
    <select onClick={onClick} className={className} placeholder={placeholder}>
      {values.map((value) => (
        <option value={value}>{value}</option>
      ))}
    </select>
  );
};

export default ComboBox;
