import { Module } from '@nestjs/common';
import { RowController } from './row.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Row } from './Entity/row';
import { RowService } from './row.service';
import { Question } from 'src/question/Entity/question.entity';

@Module({
  controllers: [RowController],
  providers: [RowService],
  imports: [TypeOrmModule.forFeature([Row, Question])],
})
export class RowModule {}
