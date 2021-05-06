import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="px-4 py-3 w-full bg-accent">
      <Link to="/">
        <h1 className="text-primary text-xl font-serif font-semibold italic">Grup Üç Kuaför</h1>
      </Link>
    </div>
  );
};

export default Header;
