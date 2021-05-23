import React from "react";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import styled from "styled-components";

const SearchBarButton = ({ className, onClick, type, children }) => {
  return (
    <Search>
      <IoIosSearch
        style={{ marginLeft: "1rem", position: "absolute" }}
        color="#e6e6e6"
        size="1.5em"
      />
      <SearchBar className={className} id="search-bar" type="text" placeholder="Search" />
    </Search>
  );
};

const Search = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  float: right;
  justifycontents: flex-end;
`;

const SearchBar = styled.input`
  padding: 1rem 1rem 1rem 3rem;
  display: flex;
  float: right;
  justifycontents: flex-end;
`;

export default SearchBarButton;
