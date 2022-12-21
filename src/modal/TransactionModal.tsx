import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import Backdrop from './BackDrop'
import { modalVaraints } from '../constants/variants'
import './Modal.scss'

interface ITransactionModal {
  modal: boolean
  handleClose?: () => void
  message?: string
  status: 'pending' | 'success' | 'error'
}

const TransactionModal: React.FC<ITransactionModal> = ({
  modal,
  handleClose,
  message,
  status,
}) => {
  const getContent = () => {
    switch (status) {
      case 'error':
        return 'Sorry! Your transaction did not complete. Please try again later.'
      case 'success':
        return 'Congratulations! Your payment is confirmed.'
      default:
        return 'Please be patient while your transaction is be being processed. This ususally takes few seconds to complete.'
    }
  }

  //   const getIcon = () => {
  //     switch (status) {
  //       case "error":
  //         return <ErrorIcon />;
  //       case "success":
  //         return <SuccessIcon />;
  //       default:
  //         return (
  //           <div className="processing_loader">
  //             <ProcessIcon />
  //           </div>
  //         );
  //     }
  //   };

  const getTitle = () => {
    switch (status) {
      case 'error':
        return 'Failed'
      case 'success':
        return 'Success'
      default:
        return 'Processing!'
    }
  }

  return (
    <Backdrop handleClose={handleClose} isOpen={modal}>
      <AnimatePresence exitBeforeEnter>
        {modal && (
          <motion.div
            className={'transaction_modal'}
            onClick={(e) => e.stopPropagation()}
            variants={modalVaraints}
            animate="animate"
            initial="initial"
            exit="exit"
          >
            <div className="transaction_modal-content">
              <h2>{getTitle()}</h2>
              {/* <div className="icon">{getIcon()}</div> */}
              <p>{message ?? getContent()}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Backdrop>
  )
}

export default TransactionModal
