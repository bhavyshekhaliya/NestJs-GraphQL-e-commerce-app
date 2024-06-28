import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/authentication/auth.module';
import { UtilsModule } from './common/utils/utils.module';
import { DateScalar } from './common/scalars/date.scalars';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { VersionModule } from './modules/version/version.module';
import { AddressModule } from './modules/address/address.module';
import { CartModule } from './modules/cart/cart.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { SearchModule } from './modules/search/search.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGraphQLGruard } from './common/guards/throttlerGraphQL.guard';
 
@Module({
  imports: [
    /// Configration setup
    ConfigModule.forRoot({
      cache: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development','production')
          .default('development'),
        PORT: Joi.number().port().default(3000),  
        MONGODB_URI: Joi.string().required(),
        GRAPHQL_PLAYGROUND: Joi.boolean().required(),
        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(), 
        THROTTLE_TTL: Joi.number(),
        THROTTLE_LIMIT: Joi.number(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true
      }
    }), 

    /// MongoDB setup
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({        
        uri: configService.get<string>('MONGODB_URI'),
      }),
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
    }),

    /// Graphql setup
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async (configService: ConfigService) => ({
         autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
         playground: configService.get<boolean>('GRAPHQL_PLAYGROUND'),
         introspection: configService.get<string>('NODE_ENV') !== 'production',
         context: ({ req, resp }) => ({ req, resp}),
         csrfPrevention: true,  
      }),
      imports: [ ConfigModule ], 
      inject: [ ConfigService ],
    }),

    /// Throttler setup
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule], 
      inject: [ConfigService], 
      useFactory: async (configService: ConfigService) => [
        {  
          ttl: configService.get<number>('THROTTLE_TTL'),
          limit: configService.get<number>('THROTTLE_LIMIT'),
        }
      ], 
    }),   

    VersionModule,
    AddressModule,
    AuthModule,
    UserModule,
    ProductModule,
    CategoryModule,
    UtilsModule,
    CartModule,
    SearchModule
  ],
  controllers: [],
  providers: [
    DateScalar,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGraphQLGruard,
    }
  ],                                        
})
export class AppModule {}
