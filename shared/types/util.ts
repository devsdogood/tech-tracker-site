export type ErrorType = {
  error: string;
};

export type ApiResult<T> = ErrorType | T;
