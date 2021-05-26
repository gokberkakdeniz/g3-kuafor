import React from "react";
import { Link } from "react-router-dom";
import Title from "../Title";

const NameDiv = ({ list, style = {}, title }) => {
  return (
    <div className="" style={style}>
      <Title className="m-4" title={title} />

      {list.map((employee) => (
        <div key={employee.id}>
          <Link
            to={`employee/${employee.id}`}
            className="bg-primary text-primary w-40 h-10 font-Open-Sans font-semibold text-xl hover:text-accent">
            {employee.userName}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NameDiv;
