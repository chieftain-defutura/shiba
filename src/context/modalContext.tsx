import React, { useState, createContext } from "react";

export const ModalContext = createContext({
  loading: false,
  status: "pending",
  message: undefined,
});
const ModalContextProvider: React.FC<{ children: any }> = ({ children }) => {
  const [open, setOpen] = useState({
    loading: false,
    status: "pending",
    message: undefined,
  });
  return <ModalContextProvider>{children}</ModalContextProvider>;
};

export default ModalContextProvider;
