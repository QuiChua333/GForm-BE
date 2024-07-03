import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './Entity/answer';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
  imports: [TypeOrmModule.forFeature([Answer])],
})
export class AnswerModule {}
