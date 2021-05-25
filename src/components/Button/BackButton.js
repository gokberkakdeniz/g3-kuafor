import React from "react";
import Button from "./Button";

const BackButton = ({ children, onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="flex flex-col items-center bg-accent w-12 h-12 rounded-3xl justify-center"
      type="button">
      {children}
    </Button>
  );
};

export default BackButton;
