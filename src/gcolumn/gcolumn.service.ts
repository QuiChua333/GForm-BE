import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GColumn } from './Entity/gcolumn';
import { Question } from 'src/question/Entity/question.entity';

@Injectable()
export class GColumnService {
  constructor(
    @InjectRepository(GColumn)
    private readonly gcolumnRepository: Repository<GColumn>,

    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async changeGColumn(id: string, body: { gcolumnContent: string }) {
    const gcolumn = await this.gcolumnRepository.findOne({
      where: {
        id: id,
      },
    });
    gcolumn.gcolumnContent = body.gcolumnContent ?? gcolumn.gcolumnContent;

    return await this.gcolumnRepository.save(gcolumn);
  }

  async addGColumn(questionId: string, body: { gcolumnContent: string }) {
    const gcolumn = new GColumn();
    gcolumn.gcolumnContent = body.gcolumnContent;
    const question = await this.questionRepository.findOne({
      where: {
        id: questionId,
      },
    });
    gcolumn.question = question;
    await this.gcolumnRepository.save(gcolumn);
    return gcolumn;
  }

  async deleteGColumn(gcolumnId: string) {
    await this.gcolumnRepository.delete(gcolumnId);
    return {};
  }
}
