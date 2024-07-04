import { MultiChooseGrid } from '@/api/multi-choose-grid/entities';
import { MultiChooseOption } from '@/api/multi-choose-option/entities';
import { Question } from '@/api/question/entities';
import { Response } from '@/api/response/entities';
import { Base as BaseEntity } from '@/common/entities';

import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Answer extends BaseEntity {
  @Column({
    name: 'answer_text',
    nullable: true,
  })
  answerText?: string;

  @Column({
    name: 'single_option',
    nullable: true,
  })
  singleOption?: string;

  @Column({
    name: 'other_text',
    nullable: true,
  })
  otherText?: string;

  @Column({
    name: 'linear_value',
    nullable: true,
  })
  linearValue?: number;

  @Column({
    name: 'is_choose_other',
    nullable: true,
  })
  isChooseOther?: boolean;

  @ManyToOne(() => Response, (response) => response.answers)
  @JoinColumn({
    name: 'response_id',
  })
  response: Response;

  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'question_id',
  })
  question: Question;

  @OneToMany(
    () => MultiChooseOption,
    (multiChooseOption) => multiChooseOption.answer,
    {
      cascade: true,
    },
  )
  multiChooseOption: MultiChooseOption[];

  @OneToMany(
    () => MultiChooseGrid,
    (multiChooseGrid) => multiChooseGrid.answer,
    {
      cascade: true,
    },
  )
  multiChooseGrid: MultiChooseGrid[];
}
