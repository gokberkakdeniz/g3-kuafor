import React from "react";

const Title = ({ style, title }) => {
  return (
    <div className="w-50 h-12 rounded-3xl bg-header" style={style}>
      <h2 className="text-2xl font-Open-Sans font-semibold m-auto text-black">{title}</h2>
    </div>
  );
};

export default Title;
