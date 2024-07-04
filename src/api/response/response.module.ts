import { Module } from '@nestjs/common';
import { ResponseController } from './response.controller';
import { ResponseService } from './response.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Response } from './entities';
import { Answer } from '../answer/entities';
import { MultiChooseOption } from '../multi-choose-option/entities';
import { MultiChooseGrid } from '../multi-choose-grid/entities';
import { Question } from '../question/entities';
import { Survey } from '../survey/entities';
import { User } from '../user/entities';

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
