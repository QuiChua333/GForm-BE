import { Question } from 'src/question/Entity/question.entity';
import { Response } from 'src/response/Entity/response';
import { User } from 'src/user/Entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Survey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ownerId: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.surveys)
  owner: User;

  @OneToMany(() => Question, (question) => question.survey, {
    cascade: true,
  })
  questions: Question[];

  @OneToMany(() => Response, (response) => response.survey)
  responses: Response[];

  @CreateDateColumn()
  create_at: Date;

  @CreateDateColumn()
  update_at: Date;
}
