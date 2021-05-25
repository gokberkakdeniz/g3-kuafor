import React from "react";
import { Link, useHistory } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Button, BackButton } from "../../components/Button";

const Search = () => {
  const history = useHistory();
  const handleClick = () => {
    history.goBack();
  };
  return (
    <>
      <BackButton onClick={handleClick}>
        <IoArrowBack color="#e6e6e6" size="2em" />
      </BackButton>
      <div className="flex justify-center items-center h-full">
        <div className="absolute flex h-100 w-50 bg-header text-black">1</div>
      </div>
    </>
  );
};

export default Search;
