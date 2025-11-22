import { useEffect, useState } from 'react';

/**
 * Message Component
 * Demonstrates: Props, useState hook, useEffect hook
 * 
 * @param {string} message - The message text to display
 * @param {string} type - The type of message ('success' or 'error')
 * @param {function} onClose - Callback function when message should be closed
 */
function Message({ message, type, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  // useEffect hook to auto-hide message after 5 seconds
  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) {
          onClose();
        }
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message || !isVisible) {
    return null;
  }

  return (
    <div className={`message ${type}`}>
      {message}
    </div>
  );
}

export default Message;

