type PrismaErrorCode = "unique_constraint_error";

export interface PrismaError {
  code: PrismaErrorCode;
  payload: string[];
}
