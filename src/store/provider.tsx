import React, { ReactNode } from "react"

import TransactionContextProvider from "../context/TransactionContext"
import WrongNetworkContextProvider from "../context/WrongNetworkContext"

const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <TransactionContextProvider>
      <WrongNetworkContextProvider>{children}</WrongNetworkContextProvider>
    </TransactionContextProvider>
  )
}

export default Provider
