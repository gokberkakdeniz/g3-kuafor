import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Header = () => {
  const [searchWord, setSearchWord] = useState("");
  const storage = window.sessionStorage;
  const handleChange = (event) => {
    storage.setItem("searchWord", searchWord);
    setSearchWord(event.target.value);
  };
  return (
    <div className="px-4 py-3 w-full bg-accent">
      <Link to="/" style={{ display: "inline-block" }}>
        <h1 className="h-8 w-50 text-primary text-2xl font-Merriweather-Sans font-bold italic">
          Grup Üç Kuaför
        </h1>
      </Link>
      <SearchBar
        onChange={handleChange}
        className="bg-primary border border-8 border-primary font-serif w-50 h-3"
      />
    </div>
  );
};

export default Header;
