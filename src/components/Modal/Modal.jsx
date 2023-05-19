import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleESC);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleESC);
  }

  handleESC = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { onClose, selectedItem } = this.props;

    return (
      <div className={css.overlay} onClick={onClose}>
        <div className={css.modal} onClick={e => e.stopPropagation()}>
          <img src={selectedItem.largeImageURL} alt={selectedItem.tags} />
        </div>
      </div>
    );
  }
}

export default Modal;

Modal.proptype = {
  onClose:  PropTypes.func,
  onClick:  PropTypes.func,
  selectedItem:  PropTypes.func,
  tags: PropTypes.string,
  largeImageURL:  PropTypes.string,
}