import { Module } from '@nestjs/common';
import { GColumnController } from './gcolumn.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GColumn } from './entities/gcolumn.entity';
import { GColumnService } from './gcolumn.service';
import { Question } from '@/api/question/entities/question.entity';

@Module({
  controllers: [GColumnController],
  providers: [GColumnService],
  imports: [TypeOrmModule.forFeature([GColumn, Question])],
})
export class GColumnModule {}
