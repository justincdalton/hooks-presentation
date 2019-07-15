import { useState } from 'react';

export default function useForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
}
