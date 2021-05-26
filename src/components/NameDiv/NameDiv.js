import React from "react";
import { Link } from "react-router-dom";
import Title from "../Title";

const NameDiv = ({ list, style = {}, title }) => {
  return (
    <div
      className="md:space-y-2 sm:space-y-1 lg:space-y-4 xl:space-y-8 2xl:space-y-16"
      style={style}>
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
