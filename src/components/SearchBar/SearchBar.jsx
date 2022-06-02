import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import styles from './SearchBar.module.css';
import { IoSearch } from 'react-icons/io5';

export function SearchBar({ onSubmit })  {
  const [searchQuery, setSearchQuery] = useState('');

  function handleSearchQuery(event){
    setSearchQuery(event.currentTarget.value.toLowerCase())
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      toast.error('The input field is emptyQ');
      return;
    }

    onSubmit(searchQuery);
    setSearchQuery('')
  };

return (
      <header className={styles.SearchBar} id='searchBar' onSubmit={handleSubmit} >
        <form className={styles.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={styles['SearchForm-button']}>
            <span className={styles['SearchForm-button-label']}>Search</span>
            <IoSearch color="#fff" size="25" />
          </button>

          <input
            className={styles['SearchForm-input']}
            type="text"
            name="searchQuery"
            value={searchQuery}
            onChange={handleSearchQuery}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
