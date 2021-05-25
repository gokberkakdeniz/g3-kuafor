import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";

const NameDiv = ({ list, style }) => {
  return (
    <div className="grid grid-cols-1 absolute gap-3" style={style}>
      {list.map((employee) => (
        <Link to="*" style={{ display: "inline-block" }}>
          <Button
            className="bg-primary text-primary w-40 h-10 font-Open-Sans font-semibold text-xl"
            type="button">
            {employee.userName}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default NameDiv;
