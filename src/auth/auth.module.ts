import { Module } from "@nestjs/common";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { JwtService } from "@nestjs/jwt";

@Module({
  providers: [AuthResolver, AuthService, JwtService],
  imports: [UserModule]
})
export class AuthModule {}
