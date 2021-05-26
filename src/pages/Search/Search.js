import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Button, BackButton } from "../../components/Button";
import Workers from "../../store/employees";

const Search = () => {
  const history = useHistory();
  const storage = window.sessionStorage;
  const [value, setValue] = useState(sessionStorage.getItem("searchWord"));

  const handleClick = () => {
    history.goBack();
  };
  sessionStorage.onchange = () => {
    setValue(sessionStorage.getItem("searchWord"));
  };

  return (
    <>
      <BackButton onClick={handleClick}>
        <IoArrowBack color="#e6e6e6" size="2em" />
      </BackButton>
      <div className="flex space-x-48 h-5/6">
        <div className="overflow-y-scroll grid grid-cols-1 flex-col place-items-center ml-40 w-1/6 h-full space-y-8 rounded-3xl px-3 bg-header items-center">
          {Workers.map(
            (worker) =>
              worker.userName.toLowerCase().includes(value.toLowerCase()) && (
                <h1 className=" text-secondary">{worker.userName}</h1>
              )
          )}
        </div>

        <div className="w-1/6 h-full rounded-3xl px-3 bg-header" />

        <div className="w-1/6 h-full rounded-3xl px-3 bg-header" />
      </div>
    </>
  );
};

export default Search;
