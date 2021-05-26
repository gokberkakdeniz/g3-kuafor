import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import styled from "styled-components";

const SearchBarButton = ({ className, onChange, style, children }) => {
  const history = useHistory();
  const location = useLocation();
  const handleClick = () => {
    if (location.pathname === "/search") return;
    history.push("/search");
  };
  return (
    <Search style={style} onClick={handleClick}>
      <IoIosSearch
        style={{ marginLeft: "1rem", position: "absolute" }}
        color="#e6e6e6"
        size="1.5em"
      />
      <SearchBar
        onChange={onChange}
        className={className}
        id="search-bar"
        type="text"
        placeholder="Search"
      />
    </Search>
  );
};

const Search = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  float: right;
  justify-content: flex-start;
`;

const SearchBar = styled.input`
  padding: 1rem 1rem 1rem 3rem;
  display: flex;
  float: right;
  justify-content: flex-start;
`;

export default SearchBarButton;
