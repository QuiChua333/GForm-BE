import { Controller } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { InjectController } from '@/decorators';
import answerRoutes from './answer.routes';

@InjectController({ name: answerRoutes.index })
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}
}
