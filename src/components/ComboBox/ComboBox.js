import React from "react";
import PropTypes from "prop-types";

const ComboBox = ({ className, onChange, placeholder, values }) => {
  return (
    <select onChange={onChange} className={className}>
      <option value="" disabled selected hidden>
        {placeholder}
      </option>
      {values.map((value) => (
        <option value={value}>{value}</option>
      ))}
    </select>
  );
};

export default ComboBox;