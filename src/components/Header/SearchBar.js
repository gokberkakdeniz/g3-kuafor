import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { set } from "../../store/searchword";

const SearchBarButton = ({ className, style, children }) => {
  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();
  const handleKey = (event) => {
    if (event.key === "Enter" || event.target.id === "search-icon-button") {
      const searchValue = document.getElementById("search-bar").value;
      dispatch(set(searchValue));
      document.getElementById("search-bar").value = "";
      if (location.pathname === "/search") return;
      history.push("/search");
    }
  };
  return (
    <div className="relative flex float-right flex-start items-center" style={style}>
      <IoIosSearch
        id="search-icon-button"
        onClick={handleKey}
        className="ml-4 absolute hover:bg-accent"
        color="#e6e6e6"
        size="1.5em"
      />
      <input
        className={clsx(
          "p-4 px-12 flex float-right flex-start border outline-none focus:outline-none focus:border-gray-300",
          className
        )}
        onKeyPress={handleKey}
        id="search-bar"
        type="text"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchBarButton;
