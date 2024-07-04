import { Module } from '@nestjs/common';
import { SurveyShareController } from './survey-share.controller';
import { SurveyShareService } from './survey-share.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyShare } from './entities/survey-share.entity';
import { Survey } from '@/api/survey/entities/survey.entity';
import { User } from '@/api/user/entities/user.entity';
import { EmailModule } from '@/email/email.module';

@Module({
  controllers: [SurveyShareController],
  providers: [SurveyShareService],
  imports: [TypeOrmModule.forFeature([SurveyShare, Survey, User]), EmailModule],
})
export class SurveyShareModule {}
