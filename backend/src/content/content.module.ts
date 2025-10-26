import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../database/database.module';
import { User } from '../database/entities/user.entity';
import { AlertsController } from './alerts/alerts.controller';
import { AlertsService } from './alerts/alerts.service';
import { Alert } from './alerts/entities/alert.entity';
import { Content } from './entities/content.entity';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';

@Module({
  imports: [TypeOrmModule.forFeature([Content, User, Alert]), DatabaseModule],
  controllers: [ContentController, AlertsController],
  providers: [ContentService, AlertsService]
})
export class ContentModule {}
