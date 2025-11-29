import {
  Body,
  Controller,
  Get,
  HttpException,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { ValidationFilter } from 'src/validation/validation.filter';
import {
  LoginUserRequest,
  loginUserRequestValidation,
} from 'src/model/login.model';
import { ValidationPipe } from 'src/validation/validation.pipe';
import { Auth } from 'src/auth/auth.decorator';
import { type User } from 'prisma/generated/client';
import { RoleGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/role.decorator';

@UseGuards(RoleGuard)
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private connection: Connection,
  ) {}

  @Get('/current')
  @Roles(['admin'])
  current(@Auth() user: User): Record<string, unknown> {
    return {
      data: `Hello ${user.name} ${user.email}`,
    };
  }

  //   validation pipe dengan custom class pippe dengan zod 	(transform data agar sesuai dengan schema)
  @Post('/login')
  @UseFilters(ValidationFilter)
  //   @UsePipes(new ValidationPipe(loginUserRequestValidation)) //us method pipe haru sama objectnya dengan query/param
  login(
    @Query('name') name: string,
    @Body(new ValidationPipe(loginUserRequestValidation))
    request: LoginUserRequest,
  ) {
    return `Hello ${request.username}`;
  }

  @Get('/')
  @Roles(['admin'])
  findAll() {
    return this.userService.getUsersAll();
  }

  @Get('/create')
  create(@Query('name') name: string, @Query('email') email: string) {
    return this.userService.saveUser(name, email);
  }

  @Get('/hello')
  @UseFilters(ValidationFilter) //validation filter zod
  getHello(@Query('name') name: string): string {
    // exception filer
    if (!name) {
      throw new HttpException(
        {
          code: 400,
          errors: 'name is required',
        },
        400,
      );
    }
    return this.userService.sayHello(name);
  }

  @Get('/')
  getConnection(): string {
    return this.connection.getName();
  }

  //   Validasi param dengan pipe
  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number): string {
    return `Get ${id}`;
  }
}
