import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import UserInput from "./inputs/create-user.input";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async getAll() {
    return this.userRepository.find();
  }

  async register(input: UserInput) {
    const oldUser = await this.userRepository.findOne({
      where: {
        email: input.email.toLowerCase().trim()
      }
    });

    if (oldUser) {
      throw new BadRequestException(
        "Пользователь с таким Email уже существует"
      );
    }

    const newUser = this.userRepository.create({
      email: input.email.toLowerCase().trim(),
      password: input.password
    });

    return await this.userRepository.save(newUser);
  }
}
