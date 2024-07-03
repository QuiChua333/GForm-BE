import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { Base as BaseEntity } from '@/common/entities';
import { User } from '@/api/user/entities';

@Entity({ name: 'tokens' })
export class Token extends BaseEntity {
  @Column()
  verifyEmailToken: string;

  @Column()
  resetPasswordToken: string;

  @Column({ nullable: true })
  accessToken: string;

  @Column({ nullable: true })
  refreshToken: string;

  @OneToOne(() => User, (user) => user.token)
  @JoinColumn()
  user: User;
}
