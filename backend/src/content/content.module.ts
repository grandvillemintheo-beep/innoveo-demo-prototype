import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../database/database.module';
import { User } from '../database/entities/user.entity';
import { Content } from './entities/content.entity';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';

@Module({
  imports: [TypeOrmModule.forFeature([Content, User]), DatabaseModule],
  controllers: [ContentController],
  providers: [ContentService]
})
export class ContentModule {}
