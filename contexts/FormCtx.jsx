import React from "react";

export const FormContext = React.createContext();

export const FormContextProvider = ({children}) => {
  const abo = "andre";

  return (
    <FormContext.Provider value={{
      abo,
    }}>
      {children}
    </FormContext.Provider>
  )
}

export const FormContextPathnames = [
  "/signup",
  "/login",
]
