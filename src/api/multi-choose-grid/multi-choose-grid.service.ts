import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MultiChooseGrid } from './Entity/multiChooseGrid';
import { Repository } from 'typeorm';

@Injectable()
export class MultiChooseGridService {
  constructor(
    @InjectRepository(MultiChooseGrid)
    private readonly multiChooseGridRepository: Repository<MultiChooseGrid>,
  ) {}
}
