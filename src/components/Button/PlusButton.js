/* eslint-disable react/button-has-type */
import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";
import Popup from "../Popup";
import Button from "./Button";

const PlusButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      style={{ bottom: "0", right: "0" }}
      className="absolute ml-auto py-3 px-3 flex flex-col space-y-2 justify-center items-center">
      <Button
        onClick={togglePopup}
        className="flex flex-col items-center bg-accent w-12 h-12 rounded-3xl justify-center"
        type="button">
        <BsPlus color="#e6e6e6" size="2em" />
      </Button>
      <div>
        {isOpen && (
          <Popup
            content={
              <>
                <b>Design your Popup</b>
                <p>Lorem ipsum dolor</p>
              </>
            }
            handleClose={togglePopup}
          />
        )}
      </div>
    </div>
  );
};

export default PlusButton;
