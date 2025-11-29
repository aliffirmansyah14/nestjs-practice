import { Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { User } from 'prisma/generated/client';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { ValidationService } from 'src/validation/validation.service';
import z from 'zod';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private validation: ValidationService,
  ) {
    this.logger.debug('Create user service');
  }

  async getUsersAll() {
    return this.prismaService.user.findMany();
  }

  async saveUser(name: string, email: string, role?: string): Promise<User> {
    this.logger.debug(`create user with name:${name}, email=${email}`);
    return this.prismaService.user.create({
      data: {
        name,
        email,
        role: role ?? 'user',
      },
    });
  }

  sayHello(name: string): string {
    const schema = z.string().min(3);
    const parsed = this.validation.validate(schema, name);

    return name ? `halo bang ${parsed}` : 'require query name=';
  }
}
