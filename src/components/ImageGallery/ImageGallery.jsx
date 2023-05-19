import { Component } from 'react';
import PropTypes from 'prop-types';
import getImages from '../../services/getImages';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    status: 'idle',
    loadedImagesCount: 0,
    step: 12,
    showButton: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.setState({
        status: 'pending',
        loadedImagesCount: 1,
        showButton: false,
      });
      getImages(this.props.searchValue)
        .then(response => {
          if (response.totalHits > 0) {
            return response;
          } else {
            throw new Error('No images found');
          }
        })
        .then(images => {
          this.setState({ images, status: 'resolved', showButton: true });
        })
        .catch(error => {
          this.setState({ error, status: 'rejected', images: null });
          console.error('error:', error);
        });
    }
  }

  loadMoreImages = () => {
    const { searchValue } = this.props;
    const { loadedImagesCount, images } = this.state;
    let newLoadedImagesCount = loadedImagesCount + 1;

    if (newLoadedImagesCount >= images.totalHits) {
      this.setState({ showButton: false });
      return;
    }

    getImages(searchValue, newLoadedImagesCount, this.state.step)
      .then(newImage => {
        const allImages = [...images.hits, ...newImage.hits];
        const totalImagesCount = newImage.totalHits;

        this.setState({
          images: { ...images, hits: allImages },
          loadedImagesCount: newLoadedImagesCount,
          showButton: allImages.length < totalImagesCount,
        });
      })
      .catch(error => {
        console.error('error', error);
      });
  };

  render() {
    const { status, images, showButton, loadedImagesCount } = this.state;

    if (status === 'idle') {
      return <p style={{ textAlign: 'center' }}>Please enter search word</p>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return (
        <h1 style={{ textAlign: 'center' }}>
          Error! Not found any image. Please try again.
        </h1>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={css.gallery}>
            <ImageGalleryItem items={images.hits} />
          </ul>
          {loadedImagesCount < images.totalHits && showButton && (
            <Button onClick={this.loadMoreImages} />
          )}
        </>
      );
    }
  }
}

export default ImageGallery;

ImageGallery.proptype = {
  images: PropTypes.object,
  error: PropTypes.bool,
  status: PropTypes.string,
  loadedImagesCount: PropTypes.number,
  step: PropTypes.number,
  showButton: PropTypes.bool,
  onClick:  PropTypes.func,
  items: PropTypes.object
}
