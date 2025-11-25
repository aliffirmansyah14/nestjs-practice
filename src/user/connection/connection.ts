import { Injectable } from '@nestjs/common';

export class Connection {
  getName(): string {
    return 'connection';
  }
}

@Injectable()
export class PostgresConnection implements Connection {
  getName(): string {
    return 'Connection wiht postgres db';
  }
}
@Injectable()
export class MySqlConnection implements Connection {
  getName(): string {
    return 'Connection wiht MySql db';
  }
}
