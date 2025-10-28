import React from 'react';

interface ErrorAlertProps {
  message: string | null;
  onClose: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="error-alert">
      <div className="error-content">
        <span className="error-icon">⚠️</span>
        <span className="error-message">{message}</span>
        <button 
          className="error-close" 
          onClick={onClose}
          aria-label="Close error"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ErrorAlert;
