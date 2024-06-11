import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import argon2 from 'argon2';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async changePassword(userId: number, newPassword: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    const hashedPassword = await argon2.hash(newPassword);
    user.password = hashedPassword;

    await this.userRepository.save(user);

    return 'Password changed successfully';
  }

  async findOneByEmail(email: string): Promise<User> {
    const userInfo = await this.userRepository.findOne({
      where: { email },
      withDeleted: false,
    });

    return userInfo;
  }
}
