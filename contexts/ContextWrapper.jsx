import React from "react";
import { GlobalContext } from "@/GlobalContext";
import { FormContextProvider, FormContextPathnames } from "@/contexts/FormCtx";

const ContextWrapper = ({ children }) => {
  const global = React.useContext(GlobalContext);
  const router = global.useRouter();
  const pathname = router.pathname;

  if (FormContextPathnames.find((item) => item === pathname)) {
    return <FormContextProvider>{children}</FormContextProvider>;
  }
};

export default ContextWrapper;
