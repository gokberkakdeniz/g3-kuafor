import clsx from "clsx";
import React from "react";

const Title = ({ style = {}, className = "", title }) => {
  return (
    <div
      className={clsx(className, "flex lg:w-80 lg:h-12 rounded-3xl px-3 bg-header")}
      style={style}>
      <h2 className="text-2xl font-Open-Sans font-semibold m-auto text-black">{title}</h2>
    </div>
  );
};

export default Title;
