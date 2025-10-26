import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../database/entities/user.entity';
import { CreateContentDto } from './dto/create-content.dto';
import { Content } from './entities/content.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content) private readonly contentRepository: Repository<Content>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  findAll() {
    return this.contentRepository.find({ relations: ['author'] });
  }

  async findOne(id: string) {
    const content = await this.contentRepository.findOne({ where: { id }, relations: ['author'] });
    if (!content) {
      throw new NotFoundException(`Content ${id} not found`);
    }
    return content;
  }

  async create(payload: CreateContentDto) {
    const author = await this.usersRepository.findOne({ where: { id: payload.authorId } });
    if (!author) {
      throw new NotFoundException('Author not found');
    }

    const content = this.contentRepository.create({
      title: payload.title,
      body: payload.body,
      author,
      publishedAt: payload.publishedAt ? new Date(payload.publishedAt) : null
    });
    return this.contentRepository.save(content);
  }
}
