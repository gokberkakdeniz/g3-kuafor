/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { IoClose } from "react-icons/io5";
import { Button } from "../Button";

const Popup = (props) => {
  return (
    <div
      style={{ background: "rgba(0,0,0,0.5)" }}
      className="grid grid-cols-1 fixed bg-black z-10 inset-0 justify-center items-center place-items-center">
      <div className="border-4 border-solid border-black p-20 w-2/6 h-3/4 rounded-2xl bg-header relative margin-auto overflow-auto">
        <Button
          className="top-2 right-2 absolute bg-header w-10 h-10 text-center"
          onClick={props.handleClose}>
          <IoClose size="2.5em" style={{ fill: "black" }} />
        </Button>
        {props.content}
      </div>
    </div>
  );
};

export default Popup;
