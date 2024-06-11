// import { PrismaClientKnownRequestError } from '@prisma/client';
// import { AllExceptionsFilter } from './http-exception.filter';
// import { ArgumentsHost, Catch } from '@nestjs/common';
// import { Request, Response } from 'express';

// @Catch(PrismaClientKnownRequestError)
// export class PrismaExceptionFilter extends AllExceptionsFilter {
//   catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();

//     response.status(400).json({
//       statusCode: 400,
//       message: exception.message,
//       path: request.url,
//     });
//   }
// }



// import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
// import { Prisma } from '@prisma/client';
// import { Response } from 'express';

// @Catch()
// export class PrismaExceptionFilter implements ExceptionFilter {
//   catch(exception: any, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();

//     if (exception instanceof Prisma.PrismaClientKnownRequestError) {
//       let status = HttpStatus.BAD_REQUEST;
//       let message = exception.message;

//       // Custom handling for specific error codes
//       switch (exception.code) {
//         case 'P2002':
//           message = 'Unique constraint failed';
//           break;
//         // Add more cases as needed
//       }

//       response.status(status).json({
//         statusCode: status,
//         timestamp: new Date().toISOString(),
//         path: request.url,
//         message,
//       });
//     } else {
//       response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
//         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//         timestamp: new Date().toISOString(),
//         path: request.url,
//         message: 'Internal server error',
//       });
//     }
//   }
// }
