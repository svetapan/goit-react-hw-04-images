import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export default function Modal({onClose, selectedItem}) {
  useEffect(() => {
    const handleESC = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleESC);

    return () => {
      document.removeEventListener('keydown', handleESC);
    }
  }, [onClose]);


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
   selectedItem: PropTypes.shape({
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
  }),
};
