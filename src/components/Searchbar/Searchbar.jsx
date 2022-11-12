import { SearchbarEl } from './Searchbar.styled';
import SearchForm from 'components/SearchForm/SearchForm';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  return (
    <SearchbarEl>
      <SearchForm onSubmitForm={onSubmit} />
    </SearchbarEl>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
