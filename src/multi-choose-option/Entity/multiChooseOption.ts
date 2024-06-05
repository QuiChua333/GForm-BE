import { Answer } from 'src/answer/Entity/answer';
import { Question } from 'src/question/Entity/question.entity';
import { Response } from 'src/response/Entity/response';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MultiChooseOption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  option: string;

  @ManyToOne(() => Answer, (answer) => answer.multiChooseOption, {
    onDelete: 'CASCADE',
  })
  answer: Answer;

  @CreateDateColumn()
  create_at: Date;

  @CreateDateColumn()
  update_at: Date;
}
