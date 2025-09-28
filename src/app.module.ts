import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import { ProvidersModule } from './providers/providers.module';
import { ManagersModule } from './managers/managers.module';
import { LocationsModule } from './locations/locations.module';
import { RegionsModule } from './regions/regions.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_KEY } from './auth/constants/jwt.constants';
import { EXPIRES_IN } from './auth/constants/jwt.constants';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: { 
        expiresIn: EXPIRES_IN
       }
    }),
    ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.host,
        port: Number(process.env.port),
        username: 'postgres',
        password: "soylacomadreja",
        database: process.env.name,
        autoLoadEntities: true,
        entities: [],
        synchronize: true,
  }), EmployeesModule, ProductsModule, ProvidersModule, ManagersModule, LocationsModule, RegionsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
