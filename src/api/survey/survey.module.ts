import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { Survey } from './Entity/survey.entity';
import { Question } from '@/api/question/Entity/question.entity';
import { JwtStrategy } from '@/api/auth/strategy/jwt.strategy';
import { User } from '@/api/user/entities/user.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { SurveyShare } from '@/api/survey-share/Entity/survey_share';
import { Response } from '@/api/response/Entity/response';

@Module({
  providers: [SurveyService],
  controllers: [SurveyController],
  imports: [
    TypeOrmModule.forFeature([Survey, Question, User, SurveyShare, Response]),
    CloudinaryModule,
  ],
})
export class SurveyModule {}
