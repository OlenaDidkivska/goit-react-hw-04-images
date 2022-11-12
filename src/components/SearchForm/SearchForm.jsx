import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, SearchFormButton, Field, ErrorText } from './SearchForm.styled';

const schema = yup
  .object()
  .shape({
    queryImg: yup
      .string()
      .max(40, 'Try making a shorter query')
      .lowercase()
      .required("You didn't enter anything!"),
  })
  .required();

export default function SearchForm({ onSubmitForm }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <Form onSubmit={handleSubmit(async data => await onSubmitForm(data))}>
      <SearchFormButton type="submit">
        <AiOutlineSearch size="25px" />
      </SearchFormButton>

      <Field
        type="text"
        {...register('queryImg')}
        placeholder="Search images and photos"
      />
      <ErrorText>{errors.queryImg?.message}</ErrorText>
    </Form>
  );
}

SearchForm.propTypes = {
  onSubmitForm: PropTypes.func,
};
