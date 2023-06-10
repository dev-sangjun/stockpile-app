import { capitalize, hasAllKeys } from "./common.utils";

type PrismaErrorCode = "unique_constraint_error";

export interface PrismaError {
  code: PrismaErrorCode;
  payload: string[];
}

export const isPrismaError = (e: object) => hasAllKeys(["code", "payload"], e);

export const getPrismaErrorAlertMessages = (e: PrismaError): string[] => {
  const { code, payload } = e;
  console.log(payload);
  switch (code) {
    case "unique_constraint_error":
      return payload.map(field => `${capitalize(field)} already in use.`);
  }
};
