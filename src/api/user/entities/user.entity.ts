import { omit } from 'ramda';
import { SurveyShare } from '@/api/survey-share/entities';
import { Survey } from '@/api/survey/entities/survey.entity';
import { Base as BaseEntity } from '@/common/entities';
import { BeforeInsert, Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { Token } from '@/api/token/entities';
import { bcryptPassword } from '@/utils/helpers';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({
    nullable: true,
  })
  password: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({
    name: 'is_admin',
    default: false,
  })
  isAdmin: boolean;

  @Column({
    name: 'is_google_account',
    default: false,
  })
  isGoogleAccount: boolean;

  @Column({
    name: 'is_verified_email',
    default: false,
  })
  isVerifiedEmail: boolean;

  @OneToOne(() => Token, (token) => token.user)
  token: Token;

  @OneToMany(() => Survey, (survey) => survey.owner)
  surveys: Survey[];

  @OneToMany(() => SurveyShare, (surveyShare) => surveyShare.user)
  surveyShares: SurveyShare[];

  @BeforeInsert()
  private async setInsertingData(): Promise<void> {
    const saltRounds = 10;
    if (this.isGoogleAccount) return;
    this.password = await bcryptPassword.generateWithBcrypt({
      source: this.password,
      salt: saltRounds,
    });
  }

  public toResponse(): Omit<this, 'password'> {
    return {
      ...omit(['password', 'setInsertingData'], this),
    };
  }

  // public toResponseHavingSessions(sessions: Token[]): Omit<this, 'password' | ''> & {
  //   role: string;
  //   gender: string;
  //   sessions: Token[];
  // } {
  //   return {
  //     ...this.toResponse(),
  //     sessions,
  //   };
  // }
}
