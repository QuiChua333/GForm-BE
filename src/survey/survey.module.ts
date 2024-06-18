import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { Survey } from './Entity/survey.entity';
import { Question } from 'src/question/Entity/question.entity';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { User } from 'src/user/Entity/user.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { SurveyShare } from 'src/survey-share/Entity/survey_share';
import { Response } from 'src/response/Entity/response';

@Module({
  providers: [SurveyService],
  controllers: [SurveyController],
  imports: [
    TypeOrmModule.forFeature([Survey, Question, User, SurveyShare, Response]),
    CloudinaryModule,
  ],
})
export class SurveyModule {}
