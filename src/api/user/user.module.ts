import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User]), CloudinaryModule],
})
export class UserModule {}
