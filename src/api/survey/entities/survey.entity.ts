import { Question } from '@/api/question/entities';
import { Response } from '@/api/response/entities';
import { SurveyShare } from '@/api/survey-share/entities';
import { User } from '@/api/user/entities';
import { Base as BaseEntity } from '@/common/entities';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Survey extends BaseEntity {
  @Column({
    name: 'owner_id_string',
  })
  ownerIdString: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    name: 'background_image',
    nullable: true,
  })
  backgroundImage: string;

  @Column({
    name: 'is_accepting',
    default: true,
  })
  isAccepting: boolean;

  @ManyToOne(() => User, (user) => user.surveys)
  @JoinColumn({
    name: 'owner_id',
  })
  owner: User;

  @OneToMany(() => Question, (question) => question.survey, {
    cascade: true,
  })
  questions: Question[];

  @OneToMany(() => Response, (response) => response.survey)
  responses: Response[];

  @OneToMany(() => SurveyShare, (surveyShare) => surveyShare.survey)
  surveyShares: SurveyShare[];
}
