import { Module } from '@nestjs/common';
import { ResponseController } from './response.controller';
import { ResponseService } from './response.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Response } from './Entity/response';
import { Answer } from 'src/answer/Entity/answer';
import { MultiChooseOption } from 'src/multi-choose-option/Entity/multiChooseOption';
import { MultiChooseGrid } from 'src/multi-choose-grid/Entity/multiChooseGrid';
import { Question } from 'src/question/Entity/question.entity';
import { Survey } from 'src/survey/Entity/survey.entity';
import { User } from 'src/user/Entity/user.entity';

@Module({
  controllers: [ResponseController],
  providers: [ResponseService],
  imports: [
    TypeOrmModule.forFeature([
      Response,
      Answer,
      MultiChooseOption,
      MultiChooseGrid,
      Question,
      Survey,
      User,
    ]),
  ],
})
export class ResponseModule {}
