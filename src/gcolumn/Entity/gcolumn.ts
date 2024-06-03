import { Question } from 'src/question/Entity/question.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class GColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  gcolumnContent: string;

  @ManyToOne(() => Question, (quesiton) => quesiton.gcolumns, {
    onDelete: 'CASCADE',
  })
  question: Question;

  @CreateDateColumn()
  create_at: Date;

  @CreateDateColumn()
  update_at: Date;
}
