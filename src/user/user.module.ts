import { Module, Post } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import {
  Connection,
  MySqlConnection,
  PostgresConnection,
} from './connection/connection';

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
