import { useState } from 'react';
import { FaSistrix } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export default function Searchbar({onSearch}) {
  const [textSearch, setTextSearch] = useState('');

  const handleChange = evt => {
    setTextSearch(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (textSearch.trim() === '') {
      return toast.error('You did not enter anything into the search');
    }

    onSearch(textSearch);
  };

  return (
    <>
      <header className={css.searchbar}>
        <form onSubmit={handleSubmit} className={css.searchForm}>
          <button type="submit" className={css.searchFormButton}>
            <FaSistrix />
            <span className={css.searchFormButtonLabel}>search button</span>
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={textSearch}
            onChange={handleChange}
          />
        </form>
      </header>
    </>
  );
}

Searchbar.propType = {
  textSearch: PropTypes.string,
  onSearch: PropTypes.func,
};