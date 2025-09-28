import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  registerUser(CreateUserDto: CreateUserDto) {
    CreateUserDto.userPassword = bcrypt.hashSync(CreateUserDto.userPassword, 5);
    return this.userRepository.save(CreateUserDto);
  }

  async loginUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({ 
      where: { userEmail: createUserDto.userEmail }
    });
    if (!user) {
      throw new UnauthorizedException("No estás autorizado");
    }
    const match = await bcrypt.compare(createUserDto.userPassword, user.userPassword);
    if (!match) throw new UnauthorizedException("No estás autorizado");
    const token = Jwt.sign(JSON.stringify(user), "SECRETKEY");
    return token 

  }
 
}
