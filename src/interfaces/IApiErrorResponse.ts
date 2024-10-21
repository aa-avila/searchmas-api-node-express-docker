export interface IApiErrorResponse {
  /**
   * The http code of the response
   * @example 418
   */
  statusCode: number;

  /**
   * Name of the error
   * @example "I'm a Teapot"
   */
  error: string;

  /**
   * Message or explanation of the error
   * @example "The requested entity body is short and stout."
   */
  message: string;

  /**
   * Additional related details
   * @example Some other useful details...
   */
  details?: any;

  /**
   * Technical details of the error
   * @example "TypeError: Cannot read properties of undefined (reading 'user')"
   */
  stack?: any;
}
