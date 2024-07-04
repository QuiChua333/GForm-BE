import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { Survey } from './entities/survey.entity';
import { Question } from '@/api/question/entities/question.entity';
import { User } from '@/api/user/entities/user.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { SurveyShare } from '../survey-share/entities';
import { Response } from '../response/entities';

@Module({
  providers: [SurveyService],
  controllers: [SurveyController],
  imports: [
    TypeOrmModule.forFeature([Survey, Question, User, SurveyShare, Response]),
    CloudinaryModule,
  ],
})
export class SurveyModule {}
