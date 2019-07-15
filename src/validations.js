import validator from 'validator';

export const isRequired = (fieldName) => (object, errors) => {
  if (validator.isEmpty(object[fieldName])) {
    errors[fieldName] = true;
  }
};

export const isEmail = (fieldName) => (object, errors) => {
  if (!validator.isEmail(object[fieldName])) {
    errors[fieldName] = true;
  }
};
