import React from "react";
import Title from "./Title";

const Titles = () => {
  return (
    <>
      <h1
        style={{ marginTop: "2%", position: "absolute", display: "flex" }}
        className="text-primary text-3xl font-Open-Sans font-semibold ">
        EMPLOYEES
      </h1>
      <Title
        title="WOMAN HAIRDRESSER"
        style={{
          marginTop: "10%",
          display: "flex",
          position: "absolute"
        }}
      />
      <Title
        title="MAN HAIRDRESSER"
        style={{
          marginTop: "10%",
          marginRight: "50%",
          display: "flex",
          position: "absolute"
        }}
      />
      <Title
        title="BEAUTY CENTER"
        style={{
          marginTop: "10%",
          position: "absolute",
          marginLeft: "50%",
          display: "flex"
        }}
      />
    </>
  );
};

export default Titles;
