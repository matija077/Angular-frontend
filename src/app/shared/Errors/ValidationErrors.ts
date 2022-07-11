export interface IIValidationError<T = undefined, U = undefined> {
  type: ValidationErrors;
  data: T;
  description?: string;
  subType?: U;

  isError<T, U>(error: IIValidationError<T, U>): boolean;
}

export type ValidationErrorsReturnType<T = undefined, U = undefined> =
  IIValidationError<T, U> | null;

enum ValidationErrors {
  PasswordsNotMatching = 'passwords_not_matching',
}

function createValidationError<T, U>({
  data,
  subType,
  type,
  description,
}: {
  type: ValidationErrors;
  data?: T;
  subType?: U;
  description?: string;
}): IIValidationError<T, U> {
  const model = {
    data,
    subType,
    type,
    description,
  };

  const prototype = {
    isError(error: IIValidationError<unknown, unknown>) {
      return (this as IIValidationError<T, U>).type === error.type;
    },
  };

  Object.setPrototypeOf(model, prototype);
  Object.freeze(model);

  return model as IIValidationError<T, U>;
}

export default { ValidationErrors, createValidationError };
