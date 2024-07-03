import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Token]), UserModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
