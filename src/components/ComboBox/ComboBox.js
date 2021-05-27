import React from "react";
import PropTypes from "prop-types";

const ComboBox = ({ className, onChange, placeholder, values, valueName, required }) => {
  return (
    <select required={required} value={valueName} onChange={onChange} className={className}>
      <option value="" disabled selected hidden>
        {placeholder}
      </option>
      {values.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default ComboBox;
