import { Module } from '@nestjs/common';
import { ResponseController } from './response.controller';
import { ResponseService } from './response.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Response } from './Entity/response';
import { Answer } from '@/api/answer/Entity/answer';
import { MultiChooseOption } from '@/api/multi-choose-option/Entity/multiChooseOption';
import { MultiChooseGrid } from '@/api/multi-choose-grid/Entity/multiChooseGrid';
import { Question } from '@/api/question/Entity/question.entity';
import { Survey } from '@/api/survey/Entity/survey.entity';
import { User } from '@/api/user/entities/user.entity';

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
