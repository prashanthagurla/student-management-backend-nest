export class ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T | null;
  error: any | null;
  meta?: object;

  static success<T>(
    data: T,
    message = 'Success',
    statusCode = 200,
    meta?: object,
  ): ApiResponse<T> {
    return {
      success: true,
      statusCode,
      message,
      data,
      error: null,
      ...(meta && { meta }),
    };
  }
  static error(
    message = 'Something went wrong',
    statusCode = 500,
    error: any = null,
  ): ApiResponse<null> {
    return {
      success: false,
      statusCode,
      message,
      data: null,
      error,
    };
  }
}
