import { Question } from '@/api/question/entities';
import { Base as BaseEntity } from '@/common/entities';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class LinearScale extends BaseEntity {
  @Column()
  min: number;

  @Column()
  max: number;

  @Column({
    name: 'left_label',
  })
  leftLabel: string;

  @Column({
    name: 'right_label',
  })
  rightLabel: string;

  @OneToOne(() => Question, (question) => question.linearScale, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'question_id',
  })
  question: Question;
}
