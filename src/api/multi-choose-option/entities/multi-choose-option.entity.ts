import { Answer } from '@/api/answer/entities';
import { Base as BaseEntity } from '@/common/entities';

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class MultiChooseOption extends BaseEntity {
  @Column()
  option: string;

  @ManyToOne(() => Answer, (answer) => answer.multiChooseOption, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'answer_id',
  })
  answer: Answer;
}
