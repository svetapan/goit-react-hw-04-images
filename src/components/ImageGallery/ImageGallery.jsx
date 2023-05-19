import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getImages from '../../services/getImages';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

export default function ImageGallery( {searchValue}) {
  const [images, setImages] = useState(null);
  const [status, setStatus] = useState('idle');
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);
  const [step] = useState(12);
  const [showButton, setShowButton] = useState(false);
  
  useEffect(() => {
      if (searchValue) {
        setStatus('pending');
        setLoadedImagesCount(1);
        setShowButton(false);

        getImages(searchValue)
          .then(response => {
            if (response.totalHits > 0) {
              return response;
            } else {
              throw new Error('No images found');
            }
          })
          .then(images => {
            setImages(images);
            setStatus('resolved');
            setShowButton(true);
          })
          .catch(error => {
            setStatus('rejected');
            setImages(null);
            console.error('error:', error);
          });
      }
    },
    [searchValue]
  );

  const loadMoreImages = () => {
    let newLoadedImagesCount = loadedImagesCount + 1;

    if (newLoadedImagesCount >= images.totalHits) {
      setShowButton(false);
      return;
    }

    getImages(searchValue, newLoadedImagesCount, step)
      .then(newImage => {
        const allImages = [...images.hits, ...newImage.hits];
        const totalImagesCount = newImage.totalHits;

        setImages({ ...images, hits: allImages });
        setLoadedImagesCount(newLoadedImagesCount);
        setShowButton(allImages.length < totalImagesCount);
      })
      .catch(error => {
        console.error('error', error);
      });
  };

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
          <Button onClick={loadMoreImages} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchValue: PropTypes.string,
  images: PropTypes.object,
  error: PropTypes.bool,
  status: PropTypes.string,
  loadedImagesCount: PropTypes.number,
  step: PropTypes.number,
  showButton: PropTypes.bool,
  onClick: PropTypes.func,
  items: PropTypes.object,
};
