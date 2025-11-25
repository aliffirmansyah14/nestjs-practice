import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private connection: Connection,
  ) {}

  @Get('/hello')
  getHello(@Query('name') name: string): string {
    return this.userService.sayHello(name);
  }

  @Get('/')
  getConnection(): string {
    return this.connection.getName();
  }
}
