import { useState } from 'react';

export default function useForm({ initialValues = {} }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const getFieldProps = fieldName => {
    const value =
      values[fieldName] === undefined ? '' : values[fieldName];

    const onChange = newValue => setFieldValue(fieldName, newValue);

    const onBlur = () => validateField(fieldName);

    return {
      onChange,
      onBlur,
      value,
      error: !!errors[fieldName],
    };
  };
}
