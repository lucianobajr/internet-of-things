import { ValidationError } from "yup";

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach((error) => {
    validationErrors[String(error.path)] = error.message;
  });

  return validationErrors;
}
