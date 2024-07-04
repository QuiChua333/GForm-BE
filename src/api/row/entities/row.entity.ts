import { Question } from '@/api/question/entities';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base as BaseEntity } from '@/common/entities';

@Entity()
export class Row extends BaseEntity {
  @Column({
    name: 'row_content',
  })
  rowContent: string;

  @ManyToOne(() => Question, (quesiton) => quesiton.rows, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'question_id',
  })
  question: Question;
}
