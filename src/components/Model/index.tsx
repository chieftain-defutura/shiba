import React, { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Backdrop from 'modal/BackDrop'

const modalVaraints = {
  initial: {
    opacity: 0,
    scale: 0.5,
    x: '-50%',
    y: '-50%',
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.3 },
    scale: 1,
    x: '-50%',
    y: '-50%',
  },
  exit: {
    opacity: 0,
    scale: 0,
    x: '-50%',
    y: '-50%',
  },
}

interface IReactModal {
  children: ReactNode
  handleClose?: () => void
  isOpen: boolean
  overlay?: boolean
  style?: React.CSSProperties
}

interface IModal {
  children: ReactNode
  handleClose?: () => void
  isOpen?: boolean
  overlay?: boolean
  style?: React.CSSProperties
}

const BaseModal: React.FC<IModal> = ({
  children,
  handleClose,
  isOpen,
  overlay = true,
  style,
}) => {
  if (!isOpen) return null

  return (
    <Backdrop isOpen={isOpen} handleClose={handleClose} overlay={overlay}>
      <AnimatePresence exitBeforeEnter>
        {isOpen && (
          <motion.div
            onClick={(e) => e.stopPropagation()}
            variants={modalVaraints}
            className="fixed-modal"
            animate="animate"
            initial="initial"
            exit="initial"
            key="content"
            style={style}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Backdrop>
  )
}

const Modal: React.FC<IReactModal> = (props) => {
  const element = document.getElementById('react-modal')
  if (!element) return null

  return createPortal(
    <BaseModal {...props}>{props.children}</BaseModal>,
    element,
  )
}

export default Modal
