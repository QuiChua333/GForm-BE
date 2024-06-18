import { Module } from '@nestjs/common';
import { SurveyShareController } from './survey-share.controller';
import { SurveyShareService } from './survey-share.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyShare } from './Entity/survey_share';
import { Survey } from 'src/survey/Entity/survey.entity';
import { User } from 'src/user/Entity/user.entity';

@Module({
  controllers: [SurveyShareController],
  providers: [SurveyShareService],
  imports: [TypeOrmModule.forFeature([SurveyShare, Survey, User])],
})
export class SurveyShareModule {}
