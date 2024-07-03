import { Question } from '@/api/question/Entity/question.entity';
import { Survey } from '@/api/survey/Entity/survey.entity';
import { User } from '@/api/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SurveyShare {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: false,
  })
  isEdit: boolean;

  @ManyToOne(() => Survey, (survey) => survey.surveyShares)
  survey: Survey;

  @ManyToOne(() => User, {
    nullable: true,
  })
  user: User;

  @Column({
    default: false,
  })
  isAccept: boolean;

  @Column()
  email: string;

  @CreateDateColumn()
  create_at: Date;

  @CreateDateColumn()
  update_at: Date;
}
