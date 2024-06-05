import { Answer } from 'src/answer/Entity/answer';
import { Question } from 'src/question/Entity/question.entity';
import { Survey } from 'src/survey/Entity/survey.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Response {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: new Date(),
  })
  submissionDate: Date;

  @OneToMany(() => Answer, (answer) => answer.response, {
    cascade: true,
  })
  answers: Answer[];

  @ManyToOne(() => Survey, (survey) => survey.responses)
  survey: Survey;

  @CreateDateColumn()
  create_at: Date;

  @CreateDateColumn()
  update_at: Date;
}
