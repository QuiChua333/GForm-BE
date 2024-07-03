import { Question } from '@/api/question/Entity/question.entity';
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
export class Row {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rowContent: string;

  @ManyToOne(() => Question, (quesiton) => quesiton.rows, {
    onDelete: 'CASCADE',
  })
  question: Question;

  @CreateDateColumn()
  create_at: Date;

  @CreateDateColumn()
  update_at: Date;
}
