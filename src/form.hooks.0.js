import React from 'react';
import {
  Button,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import { isRequired, isEmail } from './validations';
import './styles.css';

const validations = [isRequired('name'), isEmail('email')];

export default function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const values = {
      name,
      email,
    };
    errors = {};

    validations.forEach((validate) => {
      validate(values, errors);
    });

    return errors;
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  handleNameBlur = () => {
    const newErrors = validate();

    setErrors({
      ...errors,
      name: newErrors.name,
    });
  };

  handleEmailBlur = () => {
    const newErrors = validate();

    setErrors({
      ...errors,
      email: newErrors.email,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fields = {
      name,
      email,
    };
    const newErrors = validate();

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);

      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
    }, 1000);
  };

  if (submitted) {
    return <div>Submitted! Yayay!</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={name}
        onChange={handleNameChange}
        error={errors.name}
      />
      <TextField
        label="Email"
        value={email}
        onChange={handleEmailChange}
        error={errors.email}
      />
      <Button type="submit">
        {submitting && (
          <CircularProgress className="loader" size={20} />
        )}
        Submit
      </Button>
    </form>
  );
}
