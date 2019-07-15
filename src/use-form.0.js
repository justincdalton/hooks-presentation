import { useEffect, useRef, useState } from 'react';

export default function useForm({
  validations = [],
  initialValues = {},
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const mounted = useRef(true);

  useEffect(
    () => () => {
      mounted.current = false;
    },
    [mounted]
  );

  const setFieldValue = (fieldName, value) => {
    setValues({
      ...values,
      [fieldName]: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    validations.forEach(validation => validation(values, newErrors));

    setErrors(newErrors);

    return newErrors;
  };

  const validateField = fieldName => {
    const newErrors = {};

    validations.forEach(validation => validation(values, newErrors));

    setErrors({
      ...errors,
      [fieldName]: newErrors[fieldName],
    });
  };

  const getFieldProps = fieldName => {
    const value =
      values[fieldName] === undefined ? '' : values[fieldName];

    const onChange = newValue => setFieldValue(fieldName, newValue);

    const onBlur = () => validateField(fieldName);

    return {
      onChange,
      onBlur,
      value,
      isError: !!errors[fieldName],
      errorLabel: errors[fieldName],
    };
  };

  const createSubmitHandler = submit => async event => {
    if (event.preventDefault) {
      event.preventDefault();
    }

    const validationErrors = {};

    validations.forEach(validation =>
      validation(values, validationErrors)
    );

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length) {
      return;
    }

    setSubmitting(true);

    submit && (await submit(values));

    setSubmitting(false);
  };

  return {
    values,
    errors,
    createSubmitHandler,
    getFieldProps,
    submitting,
  };
}
