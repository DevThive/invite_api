import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Category } from '../types/template.type';
import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTemplatesDto {
  @IsString()
  @ApiProperty({ description: '템플릿 이름' })
  name: string;

  @IsString()
  @ApiProperty({ description: '템플릿 내용' })
  content: string;

  @ApiProperty({ description: '카테고리' })
  category: number;

  @IsString()
  @ApiProperty({ description: '연락처 부제목' })
  contact_subname: string;

  @IsString()
  @ApiProperty({ description: '연락처 주요 이름' })
  contact_mainname: string;

  @IsString()
  @ApiProperty({ description: '카카오톡 ID' })
  contact_kakaoid: string;

  @IsString()
  @ApiProperty({ description: '연락처 전화번호' })
  contact_phone: string;

  @IsString()
  @ApiProperty({ description: '연락 가능 시간' })
  contact_time: string;
}

export class UpdateTemplatesDto extends CreateTemplatesDto {}
