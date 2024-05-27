import { Survey } from 'src/survey/Entity/survey.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  isAdmin: boolean;

  @Column() @Column({ nullable: true }) refreshToken: string;

  @Column({ nullable: true })
  isVerifiedEmail: boolean;

  @OneToMany(() => Survey, (survey) => survey.owner)
  surveys: Survey[];

  @CreateDateColumn()
  create_at: Date;

  @CreateDateColumn()
  update_at: Date;
}
