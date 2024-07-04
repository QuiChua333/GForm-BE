import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { Base as BaseEntity } from '@/common/entities';
import { User } from '@/api/user/entities';

@Entity({ name: 'tokens' })
export class Token extends BaseEntity {
  @Column({
    name: 'verify_email_token',
  })
  verifyEmailToken: string;

  @Column({
    name: 'reset_password_token',
    nullable: true,
  })
  resetPasswordToken: string;

  @Column({
    name: 'access_token',
    nullable: true,
  })
  accessToken: string;

  @Column({
    name: 'refresh_token',
    nullable: true,
  })
  refreshToken: string;

  @OneToOne(() => User, (user) => user.token)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;
}
