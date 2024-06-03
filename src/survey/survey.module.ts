import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { Survey } from './Entity/survey.entity';
import { Question } from 'src/question/Entity/question.entity';

@Module({
  providers: [SurveyService],
  controllers: [SurveyController],
  imports: [TypeOrmModule.forFeature([Survey, Question])],
})
export class SurveyModule {}
