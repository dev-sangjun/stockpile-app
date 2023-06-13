import { FieldError } from "react-hook-form";

const getErrorMessage = (field: FieldError | undefined) => {
  return field?.message as string;
};

export const renderFieldErrorMessages = (field: FieldError | undefined) => {
  return (
    field && (
      <p className="text-error text-xs mt-1 ml-1">{getErrorMessage(field)}</p>
    )
  );
};

export const rendeerrorMessage = (message: string) => {
  return <p className="text-error text-xs mt-1 ml-1">{message}</p>;
};
