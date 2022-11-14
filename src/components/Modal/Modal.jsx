import { useEffect } from 'react';
import { Overlay, ModalEl } from './Modal.styled';
import PropTypes from 'prop-types';

export default function Modal({ onClose, contentModal }) {
  useEffect(() => {
    const handleKeyDown = e => {
      console.log(e);
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalEl>
        <img src={contentModal} alt="" />
      </ModalEl>
    </Overlay>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  contentModal: PropTypes.string.isRequired,
};
