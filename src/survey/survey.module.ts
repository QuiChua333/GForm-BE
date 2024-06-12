import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { Survey } from './Entity/survey.entity';
import { Question } from 'src/question/Entity/question.entity';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { User } from 'src/user/Entity/user.entity';

@Module({
  providers: [SurveyService],
  controllers: [SurveyController],
  imports: [TypeOrmModule.forFeature([Survey, Question, User])],
})
export class SurveyModule {}
