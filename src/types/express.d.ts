// TODO:: Change this with actual user data later on
import { UserEntity, UserType } from '../modules/user/entities/user.entity';

interface IAuthRole {
  id: number;
  value: string;
  type: string;
  label: string;
}

interface IAuthUser {
  id: number;
  email: string;
  username: string;
  type: UserType;

}

declare namespace Express {
  export interface Request {
    user?: IAuthUser;
  }
}
