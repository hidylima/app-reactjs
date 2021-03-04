import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const portalRoot = document.getElementById("portal-root");
const UIModal = ({ children, isModal }) => {
  if (!isModal) {
    return null;
  }
  
  return ReactDOM.createPortal(
    <div className="ui-modal__overlay">
      <div className="ui-modal">
        <button type="button" className="ui-modal__close-button">
          x
        </button>
        {children}
      </div>
    </div>,
    portalRoot,
  );
};
export default UIModal;
