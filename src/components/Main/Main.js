import React from "react";

const Main = ({ children }) => {
  return (
    <main className="p-4" style={{ height: "calc(100% - 75px)" }}>
      {children}
    </main>
  );
};

export default Main;
