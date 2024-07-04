import { Module } from '@nestjs/common';
import { OptionController } from './option.controller';
import { OptionService } from './option.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './entities/option.entity';
import { Question } from '@/api/question/entities/question.entity';

@Module({
  controllers: [OptionController],
  providers: [OptionService],
  imports: [TypeOrmModule.forFeature([Option, Question])],
})
export class OptionModule {}
