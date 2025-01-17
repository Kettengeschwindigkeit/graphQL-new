import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/user.entity";
import { Repository } from "typeorm";
import UserInput from "./inputs/create-user.input";
import { JwtService } from "@nestjs/jwt";
import { compare, genSalt, hash } from "bcryptjs";
import RefreshTokenInput from "./inputs/refresh-token.input";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async login(input: UserInput) {
    const user = await this.validateUser(input);

    const tokens = await this.issueTokenPair(user.id);

    return { ...user, ...tokens };
  }

  async getNewTokens({ refreshToken }: RefreshTokenInput) {
    if (!refreshToken) {
      throw new UnauthorizedException("Пожалуйста, войдтие в систему!");
    }

    const result = await this.jwtService.verifyAsync(refreshToken);

    if (!result) {
      throw new UnauthorizedException("Не валидный токен или он закончился!");
    }

    const user = await this.userRepository.findOneBy({ id: result.id });
    const tokens = await this.issueTokenPair(user.id);

    return { ...user, ...tokens };
  }

  async register(input: UserInput) {
    const oldUser = await this.userRepository.findOneBy({
      email: input.email.toLowerCase().trim()
    });

    if (oldUser) {
      throw new BadRequestException(
        "Пользователь с таким Email уже существует"
      );
    }

    const salt = await genSalt(10);

    const newUser = this.userRepository.create({
      email: input.email.toLowerCase().trim(),
      password: await hash(input.password, salt)
    });

    const user = await this.userRepository.save(newUser);
    const tokens = await this.issueTokenPair(user.id);

    return { ...user, ...tokens };
  }

  async validateUser(input: UserInput): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: input.email });

    if (!user) {
      throw new UnauthorizedException("Пользователь не найден!");
    }

    const isValidPassword = await compare(input.password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException("Не валидный пароль!");
    }

    return user;
  }

  async issueTokenPair(userId: number) {
    const data = { id: userId };

    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: "15d"
    });
    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: "1h"
    });

    return { refreshToken, accessToken };
  }
}
