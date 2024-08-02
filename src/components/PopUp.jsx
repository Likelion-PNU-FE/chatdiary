import React from 'react';
import PropTypes from 'prop-types';
import '../style/Popup.css';
import closeIcon from '../assets/close_icn.svg';

const Popup = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
      <div className="popup-summary-overlay">
        <div className="popup-summary">
          <button className="close-button" onClick={onClose}>
            <img src={closeIcon} alt="Close" />
          </button>
          {children}
        </div>
      </div>
  );
};

Popup.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default Popup;
