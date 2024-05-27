import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { Survey } from './Entity/survey.entity';

@Module({
  providers: [SurveyService],
  controllers: [SurveyController],
  imports: [TypeOrmModule.forFeature([Survey])],
})
export class SurveyModule {}
