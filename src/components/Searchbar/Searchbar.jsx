import React, {Component} from 'react';
import { FaSistrix } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css'

class Searchbar extends Component {
    state = {
        textSearch: '',
    };

    handleChange = evt => {
        this.setState({ textSearch: evt.currentTarget.value.toLowerCase() })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.textSearch.trim() === '') {
           return toast.error('You did not enter anything into the search');
        }
        
        this.props.onSearch(this.state.textSearch)
        this.setState({textSearch:''});
    };

    render() {
    return (
      <>
        <header className={css.searchbar}>
          <form onSubmit={this.handleSubmit} className={css.searchForm}>
            <button type="submit" className={css.searchFormButton}>
              < FaSistrix />
              <span className={css.searchFormButtonLabel}>search button</span>
            </button>

            <input
              className={css.searchFormInput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.textSearch}
              onChange={this.handleChange}
            />
          </form>
        </header>
      </>
    );
    }
}

export default Searchbar;

Searchbar.proptype = {
  textSearch:  PropTypes.string,
  onSearch: PropTypes.func,
  onChange: PropTypes.func,
}