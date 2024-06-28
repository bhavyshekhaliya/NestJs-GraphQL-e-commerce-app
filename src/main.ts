import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GraphQLExceptionFilter } from './common/filters/graphqlException.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /// for the class-validator and class-transformer
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      transform: true, // This enables class-transformer
      transformOptions: {
        enableImplicitConversion: true, // This allows class-transformer to convert types implicitly
      }, 
    })
  )

  ///for custom graphql exception filter
  app.useGlobalFilters(new GraphQLExceptionFilter());                 

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
