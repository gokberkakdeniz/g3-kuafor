import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Button = ({ className, onClick, type, children, id, disabled = false }) => {
  return (
    <button
      id={id}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "reset", "submit"]),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

Button.defaultProps = {
  className: "",
  type: "button"
};

export default Button;
