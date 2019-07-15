import React from 'react';
import {
  Button,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import { isRequired, isEmail } from './validations';
import './styles.css';
import useForm from './use-form.0';

const validations = [isRequired('name'), isEmail('email')];

export default function Form() {
  const { getFieldProps, createSubmitHandler, submitting } = useForm({
    validations,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return <div>Submitted! Yayay!</div>;
  }

  return (
    <form onSubmit={createSubmitHandler(handleSubmit)}>
      <TextField label="Name" {...getFieldProps('name')} />
      <TextField label="Email" {...getFieldProps('email')} />
      <Button type="submit">
        {submitting && (
          <CircularProgress className="loader" size={20} />
        )}
        Submit
      </Button>
    </form>
  );
}
