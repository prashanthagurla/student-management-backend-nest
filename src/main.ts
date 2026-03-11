import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT || 3200;
  //TODO If you want, I can also explain 5 powerful NestJS features most developers don't know (Interceptors, Pipes, Guards, Middleware, Filters).
  //Global validation pipe for clss-validator DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automaticallly converts request values to the correct type.
      whitelist: true, // Removes properties not defined in DTO.
      forbidNonWhitelisted: true, // Insted of removing extra fields, it throws an error.
    }),
  );

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
