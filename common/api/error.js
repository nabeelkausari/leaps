export class ApiError extends Error {
  constructor(exception, timeToLive) {
    super(exception.message);
    this.name = "API Error";
    this.error_code = exception.error_code;
    this.time_to_live = timeToLive === undefined ? 5 : timeToLive;
    this.body = exception;
  }
}
export const throwError = (exception, timeToLive) => {
  throw new ApiError(exception, timeToLive);
};
