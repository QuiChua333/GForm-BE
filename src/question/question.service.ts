import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Question } from './Entity/question.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}
}
