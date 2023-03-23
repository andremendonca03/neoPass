import React from "react";
import { GlobalContext } from "@/GlobalContext";


const Index = () => {
  
  const global = React.useContext(GlobalContext);
  console.log(global.auth);

  return <div>Indsexd</div>;
};

export default Index;
