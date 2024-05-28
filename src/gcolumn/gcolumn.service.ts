import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GColumn } from './Entity/gcolumn';

@Injectable()
export class GColumnService {
  constructor(
    @InjectRepository(GColumn)
    private readonly gcolumnRepository: Repository<GColumn>,
  ) {}
}
