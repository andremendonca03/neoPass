import React from "react";
import { useRouter } from "next/router";
import { FormContextProvider, FormContextPathnames } from "@/contexts/FormCtx";

const ContextWrapper = ({ children }) => {
  const router = useRouter();
  const pathname = router.pathname;

  if (pathname === "/") {
    return children;
  }

  if (FormContextPathnames.find((item) => item === pathname)) {
    return <FormContextProvider>{children}</FormContextProvider>;
  }
};

export default ContextWrapper;
