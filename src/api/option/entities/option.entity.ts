import { Question } from '@/api/question/entities';
import { Base as BaseEntity } from '@/common/entities';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Option extends BaseEntity {
  @Column({
    name: 'option_text',
    nullable: true,
  })
  optionText: string;

  @ManyToOne(() => Question, (quesiton) => quesiton.options, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'question_id',
  })
  question: Question;
}
