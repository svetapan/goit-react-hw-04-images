import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export default function App() {
  const [textSearch, setTextSearch] = useState('');

  const handleFormSubmit = (textSearch) => {
    setTextSearch( textSearch );
  };

  return (
    <div>
      <Toaster
        toastOptions={{
          duration: 1500,
        }}
      />
      <Searchbar onSearch={handleFormSubmit} />
      <ImageGallery searchValue={textSearch} />
    </div>
  );
}

App.propType = {
  textSearch: PropTypes.string,
  onSearch: PropTypes.func,
  searchValue: PropTypes.func,
  toastOptions: PropTypes.object,
};