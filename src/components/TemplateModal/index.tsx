import React from 'react'
import { ReactNode } from 'react'
import Close from '../../assets/icon/close.svg'
import './TemplateModal.css'

interface ITemplate {
  title: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export const TemplateModal: React.FC<ITemplate> = ({
  title,
  isOpen,
  onClose,
  children,
}) => {
  const overlayRef = React.useRef(null)

  const handleOverlayClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === overlayRef.current) {
      onClose()
    }
  }

  return isOpen ? (
    <div className="modal">
      <div
        className="modalOverlay"
        onClick={handleOverlayClick}
        ref={overlayRef}
      ></div>
      <div className="modalBox">
        <button className="modalCloseBtn" onClick={onClose}>
          <img src={Close} alt="closeIcon" />
        </button>

        <div className="modalTitle">{title}</div>
        <div className="modalContent">{children}</div>
      </div>
    </div>
  ) : null
}
