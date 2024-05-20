import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateUserDto } from 'src/use-cases/user/interface/dto/create.user.dto.interface';
import { IUserRepository } from 'src/use-cases/user/interface/repository/user.repository.interface';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { IUserEntity } from 'src/entiies/user/interface/user.entity.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(data: ICreateUserDto): Promise<IUserEntity> {
    try {
      const user = this.userRepository.create(data);
      return await this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<IUserEntity> {
    try {
      return this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new Error('User not found');
    }
  }

  findByEmail(email: string): Promise<IUserEntity> {
    try {
      return this.userRepository.findOneBy({ email });
    } catch (error) {
      throw new Error('User not found');
    }
  }

  async findOne(userId: string): Promise<IUserEntity> {
    try {
      return this.userRepository.findOne({ where: { id: userId }, relations: ["groups"] });
    } catch (error) {
      throw new Error('User not found');
    }
  }

  async addUserToGroup(user: IUserEntity) {
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new Error(error);
    }
  }
}
