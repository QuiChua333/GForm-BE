import { SurveyShare } from 'src/survey-share/Entity/survey_share';
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

  @Column({
    nullable: true,
  })
  password: string;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  isAdmin: boolean;

  @Column({ nullable: true })
  isGoogleAccount: boolean;

  @Column() @Column({ nullable: true }) refreshToken: string;

  @Column({ nullable: true })
  isVerifiedEmail: boolean;

  @OneToMany(() => Survey, (survey) => survey.owner)
  surveys: Survey[];

  @OneToMany(() => SurveyShare, (surveyShare) => surveyShare.user)
  surveyShares: SurveyShare[];

  @CreateDateColumn()
  create_at: Date;

  @CreateDateColumn()
  update_at: Date;
}
