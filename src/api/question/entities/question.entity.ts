import { Answer } from '@/api/answer/entities';
import { GColumn } from '@/api/gcolumn/entities';
import { LinearScale } from '@/api/linear-scale/entities';
import { Option } from '@/api/option/entities';
import { Row } from '@/api/row/entities';
import { Survey } from '@/api/survey/entities/survey.entity';
import { Validation } from '@/api/validation/entities';
import { Base as BaseEntity } from '@/common/entities';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class Question extends BaseEntity {
  @Column()
  question: string;

  @Column()
  description: string;

  @Column({
    nullable: true,
  })
  image: string;

  @Column({
    name: 'is_required',
  })
  isRequired: boolean;

  @Column({
    name: 'is_has_description',
  })
  isHasDescription: boolean;

  @Column({
    name: 'question_type',
  })
  questionType: string;

  @Column({
    name: 'is_validation',
  })
  isValidation: boolean;

  @Column({
    name: 'is_has_other',
  })
  isHasOther: boolean;

  @Column({
    name: 'next_question_id',
  })
  nextQuestionId?: string;

  @Column({
    name: 'previous_question_id',
  })
  previousQuestionId?: string;

  @ManyToOne(() => Survey, (survey) => survey.questions)
  @JoinColumn({
    name: 'survey_id',
  })
  survey: Survey;

  @OneToMany(() => Option, (option) => option.question, {
    cascade: true,
    eager: true,
  })
  options: Option[];

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @OneToMany(() => Row, (row) => row.question, {
    cascade: true,
    eager: true,
  })
  rows: Row[];

  @OneToMany(() => GColumn, (row) => row.question, {
    cascade: true,
    eager: true,
  })
  gcolumns: GColumn[];

  @OneToOne(() => Validation, (validation) => validation.question, {
    cascade: true,
    eager: true,
  })
  validation: Validation;

  @OneToOne(() => LinearScale, (linearScale) => linearScale.question, {
    cascade: true,
    eager: true,
  })
  linearScale: LinearScale;
}
