import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Row } from './Entity/row';
import { Question } from 'src/question/Entity/question.entity';

@Injectable()
export class RowService {
  constructor(
    @InjectRepository(Row)
    private readonly rowRepository: Repository<Row>,

    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async changeRow(id: string, body: { rowContent: string }) {
    const row = await this.rowRepository.findOne({
      where: {
        id: id,
      },
    });
    row.rowContent = body.rowContent ?? row.rowContent;

    return await this.rowRepository.save(row);
  }

  async addRow(questionId: string, body: { rowContent: string }) {
    const row = new Row();
    row.rowContent = body.rowContent;
    const question = await this.questionRepository.findOne({
      where: {
        id: questionId,
      },
    });
    row.question = question;
    await this.rowRepository.save(row);
    return row;
  }

  async deleteRow(rowId: string) {
    await this.rowRepository.delete(rowId);
    return {};
  }
}
