import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LinearScale } from './Entity/linear_scale';

@Injectable()
export class LinearScaleService {
  constructor(
    @InjectRepository(LinearScale)
    private readonly linearScaleRepository: Repository<LinearScale>,
  ) {}
}
