import { Answer } from '@/api/answer/entities';
import { Base as BaseEntity } from '@/common/entities';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MultiChooseGrid extends BaseEntity {
  @Column()
  row: string;

  @Column({
    nullable: true,
  })
  gcolumn: string;

  @ManyToOne(() => Answer, (answer) => answer.multiChooseGrid, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'answer_id',
  })
  answer: Answer;
}
