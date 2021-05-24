import React from "react";
import { PlusButton } from "../Button";

const Main = ({ children }) => {
  return (
    <main className="p-4" style={{ height: "calc(100% - 75px)" }}>
      {children}
      <PlusButton />
    </main>
  );
};

export default Main;
