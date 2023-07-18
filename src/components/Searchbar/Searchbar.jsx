import { useState } from 'react';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { IconContext } from 'react-icons';

import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (searchName === '') {
      Notiflix.Notify.warning('Please, enter search fetch');
      return;
    }
    onSubmit(searchName);

    setSearchName('');
  };

  const handleInputAdd = e => {
    const { value } = e.target;

    setSearchName(value);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <IconContext.Provider
          value={{
            style: { color: 'black', width: '1.5em', height: '1.5em' },
          }}
        >
          <button type="submit" className={css.searchFormButton}>
            <ImSearch />
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>
        </IconContext.Provider>
        <input
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchName}
          onChange={handleInputAdd}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};