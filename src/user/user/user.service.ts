import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  sayHello(name: string): string {
    return name ? `halo bang ${name}` : 'require query name=';
  }
}
