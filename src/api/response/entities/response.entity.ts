import { Answer } from '@/api/answer/entities';
import { Survey } from '@/api/survey/entities';
import { Base as BaseEntity } from '@/common/entities';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Response extends BaseEntity {
  @Column({
    name: 'submisstion_date',
  })
  submissionDate: Date;

  @OneToMany(() => Answer, (answer) => answer.response, {
    cascade: true,
  })
  answers: Answer[];

  @ManyToOne(() => Survey, (survey) => survey.responses)
  @JoinColumn({
    name: 'survey_id',
  })
  survey: Survey;
}
