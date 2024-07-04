import { Survey } from '@/api/survey/entities';
import { User } from '@/api/user/entities';
import { Base as BaseEntity } from '@/common/entities';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class SurveyShare extends BaseEntity {
  @Column({
    name: 'is_edit',
    default: false,
  })
  isEdit: boolean;

  @ManyToOne(() => Survey, (survey) => survey.surveyShares)
  @JoinColumn({
    name: 'survey_id',
  })
  survey: Survey;

  @ManyToOne(() => User, (user) => user.surveyShares, {
    nullable: true,
  })
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @Column({
    name: 'is_accept',
    default: false,
  })
  isAccept: boolean;

  @Column()
  email: string;
}
