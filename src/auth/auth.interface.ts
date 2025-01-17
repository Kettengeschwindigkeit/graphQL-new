import { User } from "../user/user.entity";

export class AuthReturn extends User {
  refreshToken: string;
  accessToken: string;
}
