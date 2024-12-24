import { HttpStatus } from 'src/Helpers/http-status.helper';
import { ServiceResponse } from 'src/Helpers/service-response.helper';

export class ServiceResponseExtensions {
  static setNotFound<T>(response: ServiceResponse<T>, message: string): void {
    response.success = false;
    response.message = `${message} không tìm thấy!`;
    response.statusCode = HttpStatus.NOT_FOUND;
  }

  static setUnauthorized<T>(
    response: ServiceResponse<T>,
    message: string,
  ): void {
    response.success = false;
    response.message = message;
    response.statusCode = HttpStatus.UNAUTHORIZED;
  }

  static setBadRequest<T>(response: ServiceResponse<T>, message: string): void {
    response.success = false;
    response.message = message;
    response.statusCode = HttpStatus.BAD_REQUEST;
  }

  static setExisting<T>(response: ServiceResponse<T>, message: string): void {
    response.success = false;
    response.message = `${message} đã tồn tại!`;
    response.statusCode = HttpStatus.CONFLICT;
  }

  static setSuccess<T>(response: ServiceResponse<T>, message: string): void {
    response.success = true;
    response.message = message;
    response.statusCode = HttpStatus.SUCCESS;
  }

  static setError<T>(
    response: ServiceResponse<T>,
    message: string,
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
  ): void {
    response.success = false;
    response.message = `Đã xảy ra lỗi không mong muốn: ${message}`;
    response.statusCode = statusCode;
  }
}
