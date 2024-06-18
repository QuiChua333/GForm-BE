import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { SurveyShare } from './Entity/survey_share';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShareEmailDTO } from './DTO/share-email.dto';
import { Survey } from 'src/survey/Entity/survey.entity';
import { User } from 'src/user/Entity/user.entity';
import shareSurvey from 'src/utils/mailer/html_templates/shareSurvey';
import { MailerService } from '@nestjs-modules/mailer';
import { sendMail } from 'src/utils/mailer';

const LIMIT: number = 10;
@Injectable()
export class SurveyShareService {
  constructor(
    @InjectRepository(SurveyShare)
    private readonly surveyShareRepository: Repository<SurveyShare>,
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly mailService: MailerService,
  ) {}

  async shareWithEmail(body: ShareEmailDTO, userId: string) {
    const survey = await this.surveyRepository.findOne({
      where: {
        id: body.surveyId,
      },
      relations: ['owner'],
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

    const templateHTMLEmail = shareSurvey({
      surveyTitle: survey.title,
      message: body.message,
      linkEditSurvey: body.linkEditSurvey,
      ownerName: survey.owner.fullName,
    });
    sendMail({
      email: body.email,
      subject: body.title,
      html: templateHTMLEmail,
      mailService: this.mailService,
    });
    const response = await this.surveyShareRepository.save(surveyShare);
    return {
      email: surveyShare.email,
      isAccept: surveyShare.isAccept,
      isEdit: surveyShare.isEdit,
      sharedId: response.id,
      userId: surveyShare.user?.id,
      fullName: surveyShare.user?.fullName,
      avatar: surveyShare.user?.avatar,
    };
  }

  async getSharedSurveysOfCurrentUser(
    userId: string,
    query: { page: string; status: string; searchString: string },
  ) {
    const pageParam = Number(query.page);
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    const queryBuilder = this.surveyShareRepository
      .createQueryBuilder('surveyShare')
      .leftJoinAndSelect('surveyShare.survey', 'survey')
      .leftJoinAndSelect('survey.owner', 'owner')
      .leftJoinAndSelect('surveyShare.user', 'user')
      .loadRelationCountAndMap('survey.questionsCount', 'survey.questions')
      .loadRelationCountAndMap('survey.responsesCount', 'survey.responses')
      .where('surveyShare.email = :email', { email: user.email })
      .orderBy('survey.create_at', 'DESC')
      .skip(pageParam * LIMIT)
      .take(LIMIT);

    const totalQueryBuilder = this.surveyShareRepository
      .createQueryBuilder('surveyShare')
      .leftJoinAndSelect('surveyShare.survey', 'survey')
      .where('surveyShare.email = :email', { email: user.email });

    if (query.searchString.trim()) {
      const searchString = query.searchString.trim().toLowerCase();
      queryBuilder.andWhere('LOWER(survey.title) LIKE :searchString', {
        searchString: `%${searchString}%`,
      });
      totalQueryBuilder.andWhere('LOWER(survey.title) LIKE :searchString', {
        searchString: `%${searchString}%`,
      });
    }
    if (query.status !== '0') {
      const isAccepting = query.status === '1';
      queryBuilder.andWhere('survey.isAccepting = :isAccepting', {
        isAccepting: isAccepting,
      });
      totalQueryBuilder.andWhere('survey.isAccepting = :isAccepting', {
        isAccepting: isAccepting,
      });
    }

    let surveys = await queryBuilder.getMany();
    let sharedSurveys = surveys.map((surveyShare) => {
      return {
        id: surveyShare.survey.id,
        ownerName: surveyShare.survey.owner.fullName,
        ownerAvatar: surveyShare.survey.owner.avatar,
        title: surveyShare.survey.title,
        description: surveyShare.survey.description,
        isAccepting: surveyShare.survey.isAccepting,
        questionsCount: surveyShare.survey['questionsCount'],
        responsesCount: surveyShare.survey['responsesCount'],
        create_at: surveyShare.survey.create_at,
        isEdit: surveyShare.isEdit,
      };
    });
    surveys.forEach(async (element) => {
      if (!element.user) {
        element.user = user;
      }
      element.isAccept = true;
      await this.surveyShareRepository.save(element);
    });
    const totalSurveys = await queryBuilder.getCount();

    const nextCursor =
      (pageParam + 1) * LIMIT < totalSurveys ? (pageParam + 1) * LIMIT : null;
    return { sharedSurveys, nextCursor, totalSurveys };
  }

  async changeEditSharedUser(
    shareId: string,
    userId: string,
    body: { isEdit: boolean; surveyId: string },
  ) {
    const survey = await this.surveyRepository.findOne({
      where: {
        id: body.surveyId,
      },
      relations: ['owner'],
    });
    if (!survey) throw new BadRequestException('Khảo sát không tồn tại');
    if (survey.owner.id !== userId)
      throw new ForbiddenException('No permission');
    const sharedSurvey = await this.surveyShareRepository.findOne({
      where: {
        id: shareId,
      },
    });
    sharedSurvey.isEdit = body.isEdit;
    await this.surveyShareRepository.save(sharedSurvey);
    return {
      isEdit: body.isEdit,
      sharedId: shareId,
    };
  }

  async deleteSharedSurvey(shareId: string, userId: string, surveyId: string) {
    const survey = await this.surveyRepository.findOne({
      where: {
        id: surveyId,
      },
      relations: ['owner'],
    });
    if (!survey) throw new BadRequestException('Khảo sát không tồn tại');
    if (survey.owner.id !== userId)
      throw new ForbiddenException('No permission');
    return await this.surveyShareRepository.delete(shareId);
  }
}
