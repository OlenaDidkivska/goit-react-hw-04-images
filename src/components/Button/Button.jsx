import { ButtonEl } from './Button.styled';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return <ButtonEl onClick={onClick}>Load more</ButtonEl>;
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func,
};
