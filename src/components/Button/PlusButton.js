import React from "react";
import { BsPlus } from "react-icons/bs";
import Button from "./Button";

const PlusButton = () => {
  return (
    <div
      style={{ marginLeft: "auto", position: "absolute", bottom: "0", right: "0" }}
      className="py-3 px-3 flex flex-col space-y-2 justify-center items-center">
      <Button
        className="flex flex-col items-center bg-accent w-12 h-12 rounded-3xl justify-center"
        type="button">
        <BsPlus color="#e6e6e6" size="2em" />
      </Button>
    </div>
  );
};

export default PlusButton;
