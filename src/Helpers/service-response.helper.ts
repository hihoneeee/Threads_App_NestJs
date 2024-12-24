import { HttpStatus } from '@nestjs/common';

export class ServiceResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  accessToken?: string;
  refreshToken?: string;
  statusCode: number;
  total?: number;
  limit?: number;
  page?: number;
  expireTime?: number;

  constructor() {
    this.success = false;
    this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  }

  getMessage(): { success: boolean; message: string } {
    return {
      success: this.success,
      message: this.message,
    };
  }

  getData(): { success: boolean; message: string; data: T } {
    return {
      success: this.success,
      message: this.message,
      data: this.data,
    };
  }

  getDataTotal(): {
    success: boolean;
    message: string;
    total?: number;
    data: T;
  } {
    return {
      success: this.success,
      message: this.message,
      total: this.total,
      data: this.data,
    };
  }
}
