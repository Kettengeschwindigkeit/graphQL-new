import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import UserInput from "./inputs/create-user.input";

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users() {
    return this.userService.getAll();
  }

  @Mutation(() => User)
  async createUser(@Args("data") input: UserInput) {
    return this.userService.register(input);
  }
}
