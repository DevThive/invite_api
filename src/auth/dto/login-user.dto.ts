import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from './../../users/dto/create-user.dto';

export class LoginUserDto extends PickType(CreateUserDto, [
  'username',
  'password',
]) {}
