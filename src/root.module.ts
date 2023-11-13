import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './resources/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './resources/user/entity/user.entity';
import { OrderModule } from './resources/order/order.module';
import { ChatModule } from './resources/chat/chat.module';
import { ApiResponseModule } from './api-response/api-response.module';
import { ApiKeyMiddleware } from './middleware/apiKey.middleware';
import { AuthModule } from './resources/auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      username: 'postgres',
      password: 'example',
      port: 5438,
      database: 'postgres',
      entities: [User],
      // Don't use it in Prod otherwise data loss might occur
      synchronize: true,
      // To Use redis as caching
      /*
      cache: {
        type: 'redis',
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
      */
    }),
    UserModule,
    ChatModule,
    OrderModule,
    ApiResponseModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class RootModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('*');
  }
}
