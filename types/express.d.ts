
import { User } from '../src/user/interfaces/user.interface';
declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}