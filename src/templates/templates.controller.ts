import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TemplatesService } from './templates.service';

import { CreateTemplatesDto, UpdateTemplatesDto } from './dto/tamplates.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('템플릿')
@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  async create(@Body() createTemplatesDto: CreateTemplatesDto) {
    return this.templatesService.create(createTemplatesDto);
  }

  @Get()
  async findAll() {
    return this.templatesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.templatesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTemplatesDto: UpdateTemplatesDto,
  ) {
    return this.templatesService.update(id, updateTemplatesDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.templatesService.remove(id);
  }
}
