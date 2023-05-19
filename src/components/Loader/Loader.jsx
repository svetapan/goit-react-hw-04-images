import { Component } from 'react';
import { FaSpinner } from 'react-icons/fa';
import css from './Loader.module.css';

class Loader extends Component {
  render() {
    return (
      <div className={css.load}>
        <FaSpinner className={css.icon} />
        <p style={{ textAlign: 'center' }}>Loading...</p>
      </div>
    );
  }
}

export default Loader;