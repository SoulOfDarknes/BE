import { Request, Response } from 'express';
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let message: string | string[] =
            (exception as HttpException).message || 'Unknown server Error!';
        let status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

        if (exception instanceof HttpException) {
            status = (exception as HttpException).getStatus();
            message = (exception as HttpException)['response']['message'];
        }
        response.status(status).json({
            statusCode: status,
            message,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
        });
    }
}