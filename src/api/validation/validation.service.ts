import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Validation } from './entities/validation.entity';

@Injectable()
export class ValidationService {
  constructor(
    @InjectRepository(Validation)
    private readonly validationRepository: Repository<Validation>,
  ) {}
}
