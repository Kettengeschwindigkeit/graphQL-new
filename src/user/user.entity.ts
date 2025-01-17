import { Field, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

export enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
  STUDENT = "student"
}

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column({ unique: true, nullable: true })
  username: string;

  @Field()
  @Column({ type: "text", nullable: true })
  description: string;

  @Field()
  @Column({ name: "avatar_path", nullable: true })
  avatarPath: string;

  @Field()
  @Column({
    type: "set",
    enum: UserRole,
    default: UserRole.STUDENT
  })
  role: UserRole;

  @Field()
  @Column({ nullable: true })
  country: string;

  @Field()
  @Column({ name: "social_link", nullable: true })
  socialLink: string;

  @Field()
  @Column({ name: "remember_token", nullable: true })
  rememberToken: string;

  @Field()
  @Column({
    name: "is_verified",
    default: false,
    nullable: true
  })
  isVerified: boolean;

  @Field()
  @Column({
    name: "is_real_time",
    default: true,
    nullable: true
  })
  isRealTime: boolean;

  @Field()
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
