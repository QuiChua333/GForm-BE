import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from './Entity/option.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
  ) {}

  async changeOption(id: string, body: { optionText: string }) {
    const option = await this.optionRepository.findOne({
      where: {
        id: id,
      },
    });
    option.optionText = body.optionText ?? option.optionText;

    return await this.optionRepository.save(option);
  }
}
