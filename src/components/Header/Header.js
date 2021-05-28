import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <div className="px-4 py-3 w-full bg-accent">
      <Link to="/" className="inline-block">
        <h1 className="h-8 w-50 text-primary text-2xl font-Merriweather-Sans font-bold italic">
          Grup Üç Kuaför
        </h1>
      </Link>
      <SearchBar className="bg-primary border border-primary font-serif w-50 h-3" />
    </div>
  );
};
export default Header;
