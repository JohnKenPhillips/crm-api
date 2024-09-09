import { CacheModule } from '@nestjs/cache-manager'
// import { JwtStrategy } from './auth/jwt.strategy'
import { PassportModule } from '@nestjs/passport'
import { AppController } from './app.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppService } from './app.service'
import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'

// Entities

// import { EmployeeRole } from './employees/entities/employee-role'
import { UserContract } from './user/entities/user-contract'
import { UserAddress } from './user/entities/user-address'
// import { Employee } from './employees/entities/employee'
// import { Role } from './employees/entities/role'
import { User } from './user/entities/user'

// Module
// import { EmployeeModule } from './employees/employee.module'
// import { LoginModule } from './login/login.module'
// import { AuthModule } from './auth/auth.module'

import * as dotenv from 'dotenv'

dotenv.config()

@Module({
  imports: [
    CacheModule.register(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: Number(5432),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DB,
      entities: [User, UserAddress, UserContract],
      synchronize: true, // turn off for production.
      autoLoadEntities: true,
      logging: false,
      ssl: { rejectUnauthorized: false },
    }),
    // AuthModule,
    // LoginModule,
    // EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
