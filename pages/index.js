import React from "react";
import { GlobalContext } from "@/GlobalContext";
import Link from "next/link";

const Index = () => {
  const global = React.useContext(GlobalContext);

  

  return (
    <>
      <h1>Home</h1>
    </>
  );
};

export default Index;
