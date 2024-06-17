import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './Entity/question.entity';
import { Row } from 'src/row/Entity/row';
import { Option } from 'src/option/Entity/option.entity';
import { GColumn } from 'src/gcolumn/Entity/gcolumn';
import { LinearScale } from 'src/linear_scale/Entity/linear_scale';
import { Validation } from 'src/validation/Entity/validation.entity';
import { Survey } from 'src/survey/Entity/survey.entity';
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
