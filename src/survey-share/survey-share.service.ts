import { BadRequestException, Injectable } from '@nestjs/common';
import { SurveyShare } from './Entity/survey_share';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShareEmailDTO } from './DTO/share-email.dto';
import { Survey } from 'src/survey/Entity/survey.entity';
import { User } from 'src/user/Entity/user.entity';

@Injectable()
export class SurveyShareService {
  constructor(
    @InjectRepository(SurveyShare)
    private readonly surveyShareRepository: Repository<SurveyShare>,
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async shareWithEmail(body: ShareEmailDTO, userId: string) {
    const survey = await this.surveyRepository.findOne({
      where: {
        id: body.surveyId,
      },
    });
    if (!survey) throw new BadRequestException('Survey does not exist');
    if (survey.ownerId !== userId)
      throw new BadRequestException('No permission');
    const existedsSurveyShare = await this.surveyShareRepository.findOne({
      where: {
        email: body.email,
      },
    });
    if (existedsSurveyShare) {
      throw new BadRequestException('Người này đã được mời');
    }
    const surveyShare = new SurveyShare();
    surveyShare.email = body.email;
    surveyShare.isAccept = false;
    surveyShare.isEdit = body.isEdit;
    surveyShare.survey = survey;
    const user = await this.userRepository.findOne({
      where: {
        email: body.email,
      },
    });
    if (user) {
      surveyShare.user = user;
    }
    return await this.surveyShareRepository.save(surveyShare);
  }
}
