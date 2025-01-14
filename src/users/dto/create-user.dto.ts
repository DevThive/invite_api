import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ example: 'userid', description: '아이디' })
  username: string;

  @IsString()
  @ApiProperty({ example: 'admin2@Admin.com', description: '이메일' })
  email: string;

  @IsString()
  @ApiProperty({ example: '1234', description: '비밀번호' })
  password: string;

  @IsString()
  @ApiProperty({ description: '이름' })
  nickname: string;

  // @IsString()
  // @ApiProperty({ description: '핸드폰 번호' })
  // phone: string;
}
