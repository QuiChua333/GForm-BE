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
export class MultiChooseGrid {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  row: string;

  @Column({
    nullable: true,
  })
  gcolumn: string;

  @ManyToOne(() => Answer, (answer) => answer.multiChooseGrid, {
    onDelete: 'CASCADE',
  })
  answer: Answer;

  @CreateDateColumn()
  create_at: Date;

  @CreateDateColumn()
  update_at: Date;
}
