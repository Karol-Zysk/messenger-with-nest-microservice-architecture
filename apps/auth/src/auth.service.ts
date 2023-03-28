import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../../../libs/shared/src/entities/user.entity';
import { NewUserDTO } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUsers() {
    return this.userRepository.find();
  }

  async finfByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { email },
      select: ['email', 'firstName', 'id', 'lastName', 'password'],
    });
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(newUser: Readonly<NewUserDTO>): Promise<UserEntity> {
    const { email, firstName, lastName, password } = newUser;

    const existingUser = await this.finfByEmail(email);

    if (existingUser) {
      throw new ConflictException('An account that email already exist');
    }
    const hashPassword = await this.hashPassword(password);

    const savedUser = await this.userRepository.save({
      email,
      firstName,
      lastName,
      password: hashPassword,
    });

    delete savedUser.password;

    return savedUser;
  }
}
