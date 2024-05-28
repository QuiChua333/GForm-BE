import { Question } from 'src/question/Entity/question.entity';
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
export class Validation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  validationType: string;

  @Column()
  conditionName: string;

  @Column()
  conditionValue1: string;

  @Column()
  conditionValue2: string;

  @OneToOne(() => Question, (question) => question.validation)
  @JoinColumn()
  question: Question;

  @CreateDateColumn()
  create_at: Date;

  @CreateDateColumn()
  update_at: Date;
}
