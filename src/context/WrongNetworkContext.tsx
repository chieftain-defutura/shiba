import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react"
import WrongNetworkModal from "../modal/WrongNetworkModal"
import { useNetwork } from "wagmi"

interface IWrongNetworkContext {
  wrongNetwork: boolean
  setWrongNetwork: React.Dispatch<React.SetStateAction<boolean>>
}

export const WrongNetworkContext = createContext<IWrongNetworkContext>({
  wrongNetwork: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setWrongNetwork: () => {},
})
export const useWrongNetworkModal = () => useContext(WrongNetworkContext)
const WrongNetworkContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [wrongNetwork, setWrongNetwork] = useState<boolean>(false)
  const { chain } = useNetwork()

  useMemo(() => {
    if (chain?.unsupported === true) setWrongNetwork(true)
    if (chain?.unsupported === false) setWrongNetwork(false)
  }, [chain?.unsupported])

  return (
    <WrongNetworkContext.Provider value={{ wrongNetwork, setWrongNetwork }}>
      {children}
      <WrongNetworkModal modal={wrongNetwork} />
    </WrongNetworkContext.Provider>
  )
}

export default WrongNetworkContextProvider
