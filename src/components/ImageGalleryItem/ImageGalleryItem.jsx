import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
    selectedItemId: null,
  };

  handleImageClick = id => {
    this.setState({ showModal: true, selectedItemId: id });
  };

  handleModalClose = () => {
    this.setState({ showModal: false, selectedItemId: null });
  };

  render() {
    const { showModal, selectedItemId } = this.state;
    const { items } = this.props;
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
                  this.handleImageClick(id);
                }}
              >
                <img src={webformatURL} alt={tags} />
              </a>
            </li>
          );
        })}
        {showModal && (
          <Modal onClose={this.handleModalClose} selectedItem={selectedItem} />
        )}
      </>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.proptype = {
  showModal: PropTypes.bool,
  selectedItemId: PropTypes.bool,
  id: PropTypes.string,
  onClick: PropTypes.func,
  webformatURL: PropTypes.string,
  largeImageURL:  PropTypes.string,
  tags: PropTypes.string,
  selectedItem:  PropTypes.func,
}