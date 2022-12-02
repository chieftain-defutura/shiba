import React from "react"
import { AnimatePresence, motion } from "framer-motion"

import "./Modal.scss"
import Backdrop from "./BackDrop"
import { modalVaraints } from "../constants/variants"
import { useSwitchNetwork } from "wagmi"

interface IWrongNetworkModal {
  modal: boolean
  handleClose?: () => void
}
const WrongNetworkModal: React.FC<IWrongNetworkModal> = ({
  modal,
  handleClose,
}) => {
  const { switchNetwork } = useSwitchNetwork()
  return (
    <Backdrop handleClose={handleClose} isOpen={modal}>
      <AnimatePresence exitBeforeEnter>
        {modal && (
          <motion.div
            className={"transaction_modal"}
            onClick={(e) => e.stopPropagation()}
            variants={modalVaraints}
            animate="animate"
            initial="initial"
            exit="exit"
          >
            <div className="transaction_modal-content">
              <h2>Wrong network</h2>
              <button onClick={() => switchNetwork?.(5)}>Switch Network</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Backdrop>
  )
}

export default WrongNetworkModal
