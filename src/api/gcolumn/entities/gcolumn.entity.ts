import { Question } from '@/api/question/entities/question.entity';
import { Base as BaseEntity } from '@/common/entities';

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class GColumn extends BaseEntity {
  @Column({
    name: 'gcolumn_content',
  })
  gcolumnContent: string;

  @ManyToOne(() => Question, (quesiton) => quesiton.gcolumns, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'question_id',
  })
  question: Question;
}
