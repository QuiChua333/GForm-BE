import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Row } from '../row/entities';
import { Option } from '@/api/option/entities/option.entity';
import { GColumn } from '../gcolumn/entities';
import { LinearScale } from '../linear-scale/entities';
import { Validation } from '../validation/entities';
import { Survey } from '../survey/entities';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService],
  imports: [
    TypeOrmModule.forFeature([
      Question,
      Row,
      Option,
      GColumn,
      LinearScale,
      Validation,
      Survey,
    ]),
    CloudinaryModule,
  ],
})
export class QuestionModule {}
