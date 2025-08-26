

export type { ILogin, IRegister, IChangePass } from './auth.type'


//generic types
export interface IResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
}


export type TRole = "admin" | "sender" | "receiver";



type ZodIssue = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};

type ErrorSource = {
  path: string;
  message: string;
};

export interface IErrorResponse {
  success: boolean;
  message: string;
  errorSources?: ErrorSource[];
  err?: {
    issues: ZodIssue[];
    name: string;
  };
  stack?: string;
}