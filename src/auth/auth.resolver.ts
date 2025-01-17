import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Args, Mutation } from "@nestjs/graphql";
import AuthInput from "./inputs/create-user.input";
import { AuthReturn } from "./auth.interface";
import RefreshTokenInput from "./inputs/refresh-token.input";

@Controller("auth")
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => AuthReturn)
  async login(@Args("data") input: AuthInput) {
    return this.authService.login(input);
  }

  @Mutation(() => AuthReturn)
  async getNewTokens(@Args("data") input: RefreshTokenInput) {
    return this.authService.getNewTokens(input);
  }

  @Mutation(() => AuthReturn)
  async register(@Args("data") input: AuthInput) {
    return this.authService.register(input);
  }
}
