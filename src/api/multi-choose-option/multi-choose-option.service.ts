import { Injectable } from '@nestjs/common';
import { MultiChooseOption } from './entities/multi-choose-option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MultiChooseOptionService {
  constructor(
    @InjectRepository(MultiChooseOption)
    private readonly multiChooseOptionRepository: Repository<MultiChooseOption>,
  ) {}
}
