import clsx from "clsx";
import React from "react";
import Button from "./Button";

const BackButton = ({ children, onClick, small = false }) => {
  return (
    <Button
      onClick={onClick}
      className={clsx(
        small ? "w-8 h-8" : "w-12 h-12",
        "flex flex-col items-center bg-accent rounded-3xl justify-center"
      )}
      type="button">
      {children}
    </Button>
  );
};

export default BackButton;
