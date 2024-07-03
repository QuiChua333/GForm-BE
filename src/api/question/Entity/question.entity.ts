import { Answer } from '@/api/answer/Entity/answer';
import { GColumn } from '@/api/gcolumn/Entity/gcolumn';
import { LinearScale } from '@/api/linear_scale/Entity/linear_scale';
import { Option } from '@/api/option/Entity/option.entity';
import { Row } from '@/api/row/Entity/row';
import { Survey } from '@/api/survey/Entity/survey.entity';
import QuestionType from 'src/utils/interface/questionType';
import { Validation } from '@/api/validation/Entity/validation.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @Column()
  description: string;

  @Column({
    nullable: true,
  })
  image: string;

  @Column()
  isRequired: boolean;

  @Column()
  isHasDescription: boolean;

  @Column()
  questionType: QuestionType;

  @Column()
  isValidation: boolean;

  @Column()
  isHasOther: boolean;

  @Column()
  nextQuestionId?: string;

  @Column()
  previousQuestionId?: string;

  @ManyToOne(() => Survey, (survey) => survey.questions)
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

  @CreateDateColumn()
  create_at: Date;

  @CreateDateColumn()
  update_at: Date;
}
