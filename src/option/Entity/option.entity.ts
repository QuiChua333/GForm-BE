import { Question } from 'src/question/Entity/question.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Option {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
  })
  optionText: string;

  @ManyToOne(() => Question, (quesiton) => quesiton.options, {
    onDelete: 'CASCADE',
  })
  question: Question;

  @CreateDateColumn()
  create_at: Date;

  @CreateDateColumn()
  update_at: Date;
}
