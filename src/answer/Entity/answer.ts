import { MultiChooseGrid } from 'src/multi-choose-grid/Entity/multiChooseGrid';
import { MultiChooseOption } from 'src/multi-choose-option/Entity/multiChooseOption';
import { Question } from 'src/question/Entity/question.entity';
import { Response } from 'src/response/Entity/response';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
  })
  answerText?: string;

  @Column({
    nullable: true,
  })
  singleOption?: string;

  @Column({
    nullable: true,
  })
  otherText?: string;

  @Column({
    nullable: true,
  })
  linearValue?: number;

  @Column({
    nullable: true,
  })
  isChooseOther?: boolean;

  @ManyToOne(() => Response, (response) => response.answers)
  response: Response;

  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: 'CASCADE',
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

  @CreateDateColumn()
  create_at: Date;

  @CreateDateColumn()
  update_at: Date;
}
