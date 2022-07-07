import { useState } from "react";
import PropTypes from "prop-types";
import { BiSearch } from "react-icons/bi";
import s from './searchbar.module.css';

const SearchBar = ({onSubmit}) => {
    const [search, setSearch] = useState('');

    const handleChange = ({target}) => {
        const {value} = target;
        setSearch(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(search);
    }

    return (
        <header className={s.searchbar}>
            <form className={s.form} onSubmit={handleSubmit}>
                <input
                    className={s.input}
                    type="text"
                    autocomplete="off"
                    autofocus
                    placeholder="Search images and photos"
                    onChange={handleChange}
                 />
                <button type="submit" className={s.button}>
                <span className={s.button_label}>Search</span>
                <BiSearch className={ s.search_icon} />
                </button>
            </form>
        </header>
    )
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;