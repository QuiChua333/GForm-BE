import { Question } from '@/api/question/Entity/question.entity';
import { Response } from '@/api/response/Entity/response';
import { SurveyShare } from '@/api/survey-share/Entity/survey_share';
import { User } from '@/api/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Survey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ownerId: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    nullable: true,
  })
  backgroundImage: string;

  @Column({
    default: true,
  })
  isAccepting: boolean;

  @ManyToOne(() => User, (user) => user.surveys)
  owner: User;

  @OneToMany(() => Question, (question) => question.survey, {
    cascade: true,
  })
  questions: Question[];

  @OneToMany(() => Response, (response) => response.survey)
  responses: Response[];

  @OneToMany(() => SurveyShare, (surveyShare) => surveyShare.survey)
  surveyShares: SurveyShare[];

  @CreateDateColumn()
  create_at: Date;

  @CreateDateColumn()
  update_at: Date;
}
