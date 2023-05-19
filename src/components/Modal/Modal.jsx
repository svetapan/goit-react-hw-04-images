import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export default function Modal(onClose, selectedItem) {
  useEffect(() => {
    document.addEventListener('keydown', handleESC);
    document.removeEventListener('keydown', handleESC);
  });

  const handleESC = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <img src={selectedItem.largeImageURL} alt={selectedItem.tags} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  selectedItem: PropTypes.func,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
};
