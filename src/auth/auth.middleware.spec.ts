import { PrismaService } from 'src/db/prisma/prisma.service';
import { AuthMiddleware } from './auth.middleware';

describe('AuthMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthMiddleware(new PrismaService())).toBeDefined();
  });
});
