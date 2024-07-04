import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MultiChooseGrid } from './entities/multi-choose-grid.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MultiChooseGridService {
  constructor(
    @InjectRepository(MultiChooseGrid)
    private readonly multiChooseGridRepository: Repository<MultiChooseGrid>,
  ) {}
}
