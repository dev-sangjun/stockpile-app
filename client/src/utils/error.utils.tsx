import { FieldError } from "react-hook-form";
import { PrismaError } from "../global/error.interfaces";
import { capitalize, hasAllKeys } from "./common.utils";

export const isPrismaError = (e: object) => hasAllKeys(["code", "payload"], e);

export const getPrismaErrorAlertMessages = (e: PrismaError): string[] => {
  const { code, payload } = e;
  switch (code) {
    case "unique_constraint_error":
      return payload.map(field => `${capitalize(field)} already in use.`);
  }
};

const getFieldErrorMessage = (field: FieldError | undefined) => {
  return field?.message as string;
};

export const renderFieldErrorMessages = (field: FieldError | undefined) => {
  return (
    field && (
      <p className="text-error text-xs mt-1 ml-1">
        {getFieldErrorMessage(field)}
      </p>
    )
  );
};

export const renderErrorMessage = (message: string) => {
  return <p className="text-error text-xs mt-1 ml-1">{message}</p>;
};

export const renderAlertErrorMessages = (errorAlerts: string[]) => {
  return (
    errorAlerts.length > 0 && (
      <div className="alert alert-error flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <ul>
          {errorAlerts.map((alert, idx) => (
            <li key={idx}>{alert}</li>
          ))}
        </ul>
      </div>
    )
  );
};
