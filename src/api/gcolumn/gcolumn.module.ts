import { Module } from '@nestjs/common';
import { GColumnController } from './gcolumn.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GColumn } from './Entity/gcolumn';
import { GColumnService } from './gcolumn.service';
import { Question } from '@/api/question/Entity/question.entity';

@Module({
  controllers: [GColumnController],
  providers: [GColumnService],
  imports: [TypeOrmModule.forFeature([GColumn, Question])],
})
export class GColumnModule {}
