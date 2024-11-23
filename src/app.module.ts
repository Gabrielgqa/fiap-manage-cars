import { Get, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateAccountController } from './controllers/create-account.controller';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { AuthModule } from './auth/auth.module';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateCarController } from './controllers/create-car.controller';
import { GetListCarsController } from './controllers/get-list-cars.controller';
import { GetUnsoldCarsController } from './controllers/get-unsold-cars.controller';

@Module({
  imports: [ConfigModule.forRoot({
    validate: (env) => envSchema.parse(env),
    isGlobal: true,
  }),
  AuthModule
],
  controllers: [CreateAccountController, AuthenticateController, CreateCarController, GetListCarsController, GetUnsoldCarsController],
  providers: [PrismaService],
})
export class AppModule {}
