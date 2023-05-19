import React, { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    textSearch: '',
  };

  handleFormSubmit = textSearch => {
    this.setState({ textSearch });
  };

  render() {
    return (
      <div>
        <Toaster
          toastOptions={{
            duration: 1500,
          }}
        />
        <Searchbar onSearch={this.handleFormSubmit} />
        <ImageGallery searchValue={this.state.textSearch} />
      </div>
    );
  }
}

export default App;

App.proptype = {
   textSearch: PropTypes.string,
   onSearch:  PropTypes.func,
   searchValue:  PropTypes.func,
   toastOptions: PropTypes.object,
}