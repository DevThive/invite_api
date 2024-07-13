import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Template } from 'src/entity/template.entity';
import { CreateTemplatesDto, UpdateTemplatesDto } from './dto/tamplates.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(Template)
    private templatesRepository: Repository<Template>,
  ) {}

  async create(createTemplatesDto: CreateTemplatesDto) {
    const templates = this.templatesRepository.create(createTemplatesDto);
    return this.templatesRepository.save(templates);
  }

  async findAll() {
    return this.templatesRepository.find();
  }

  async findOne(id: number) {
    const templates = await this.templatesRepository.findOneBy({ id });
    if (!templates) {
      throw new NotFoundException(`Tamplates with ID ${id} not found`);
    }
    return templates;
  }

  async update(id: number, updateTemplatesDto: UpdateTemplatesDto) {
    await this.templatesRepository.update(id, updateTemplatesDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const templates = await this.findOne(id);
    await this.templatesRepository.remove(templates);
  }
}
