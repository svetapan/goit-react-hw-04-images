import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';

export default function ImageGalleryItem({items}) {
  const [showModal, setshowModal] = useState(false);
  const [selectedItemId, setselectedItemId] = useState(null);

  const handleImageClick = id => {
    setshowModal(true);
    setselectedItemId(id);
  };

  const handleModalClose = () => {
    setshowModal(false);
    setselectedItemId(null);
  };

  const selectedItem = items.find(item => item.id === selectedItemId);

  return (
    <>
      {items.map(item => {
        const { id, webformatURL, tags } = item;
        return (
          <li key={id} className={css.galleryItem}>
            <a
              className={css.imageGalleryItem}
              href={item.largeImageURL}
              onClick={e => {
                e.preventDefault();
                handleImageClick(id);
              }}
            >
              <img src={webformatURL} alt={tags} />
            </a>
          </li>
        );
      })}
      {showModal && (
        <Modal onClose={handleModalClose} selectedItem={selectedItem} />
      )}
    </>
  );
}

ImageGalleryItem.proptype = {
  showModal: PropTypes.bool,
  selectedItemId: PropTypes.bool,
  id: PropTypes.string,
  onClick: PropTypes.func,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
  selectedItem: PropTypes.func,
};