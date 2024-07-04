import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from './entities/option.entity';
import { Question } from '@/api/question/entities/question.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,

    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async changeOption(body: { optionText: string; id: string }) {
    const option = await this.optionRepository.findOne({
      where: {
        id: body.id,
      },
    });
    option.optionText = body.optionText ?? option.optionText;

    return await this.optionRepository.save(option);
  }
  async addOption(body: { optionText: string; questionId: string }) {
    const option = new Option();
    option.optionText = body.optionText;
    const question = await this.questionRepository.findOne({
      where: {
        id: body.questionId,
      },
    });
    option.question = question;
    await this.optionRepository.save(option);
    return option;
  }

  async deleteOption(optionId: string) {
    await this.optionRepository.delete(optionId);
    return {};
  }
}
