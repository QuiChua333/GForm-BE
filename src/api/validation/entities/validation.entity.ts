import { Question } from '@/api/question/entities';
import { Base as BaseEntity } from '@/common/entities';
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
export class Validation extends BaseEntity {
  @Column({
    name: 'validation_type',
  })
  validationType: string;

  @Column({
    name: 'condition_name',
  })
  conditionName: string;

  @Column({
    name: 'condition_value1',
  })
  conditionValue1: string;

  @Column({
    name: 'condition_value2',
  })
  conditionValue2: string;

  @OneToOne(() => Question, (question) => question.validation, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'question_id',
  })
  question: Question;
}
