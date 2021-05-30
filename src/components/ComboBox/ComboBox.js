import React from "react";

const ComboBox = ({ className, onChange, placeholder, values, valueName, disabled }) => {
  return (
    <select
      disabled={disabled}
      value={valueName}
      defaultValue=""
      onChange={onChange}
      className={className}>
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {Array.isArray(values) ? (
        values.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))
      ) : (
        <option key={values} value={values}>
          {values}
        </option>
      )}
    </select>
  );
};

export default ComboBox;
