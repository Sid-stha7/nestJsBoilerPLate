// TODO:: Change this with actual user data later on
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

}

declare namespace Express {
  export interface Request {
    user?: IAuthUser;
  }
}
