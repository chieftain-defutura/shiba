import React, { useEffect } from "react";
import "./Modal.css";

interface IModal {
  children: React.ReactNode;
  onClose?: () => void;
}

const LayoutModal: React.FC<IModal> = ({ children, onClose }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);
  return (
    <div className="layout_modal" onClick={() => onClose && onClose()}>
      <div className="layout_modal_main" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default LayoutModal;
