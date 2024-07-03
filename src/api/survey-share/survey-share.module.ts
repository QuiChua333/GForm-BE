import { Module } from '@nestjs/common';
import { SurveyShareController } from './survey-share.controller';
import { SurveyShareService } from './survey-share.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyShare } from './Entity/survey_share';
import { Survey } from '@/api/survey/Entity/survey.entity';
import { User } from '@/api/user/entities/user.entity';

@Module({
  controllers: [SurveyShareController],
  providers: [SurveyShareService],
  imports: [TypeOrmModule.forFeature([SurveyShare, Survey, User])],
})
export class SurveyShareModule {}
