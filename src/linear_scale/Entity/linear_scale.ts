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
export class LinearScale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  min: number;

  @Column()
  max: number;

  @Column()
  leftLabel: string;

  @Column()
  rightLabel: string;

  @OneToOne(() => Question, (question) => question.linearScale, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  question: Question;

  @CreateDateColumn()
  create_at: Date;

  @CreateDateColumn()
  update_at: Date;
}
