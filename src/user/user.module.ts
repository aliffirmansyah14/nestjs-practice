import { Module } from '@nestjs/common';

import {
  Connection,
  MySqlConnection,
  PostgresConnection,
} from './connection/connection';
import { UserController } from './user/user.controller.js';
import { UserService } from './user/user.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: Connection,
      useClass:
        process.env.DATABASE! === 'postgres'
          ? PostgresConnection
          : MySqlConnection,
    },
  ],
})
export class UserModule {}
