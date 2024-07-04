import { Controller } from '@nestjs/common';
import { MultiChooseOptionService } from './multi-choose-option.service';
import { InjectController } from '@/decorators';
import multiChooseOptionRoutes from './multi-choose-option.routes';

@InjectController({ name: multiChooseOptionRoutes.index })
export class MultiChooseOptionController {
  constructor(
    private readonly multiChooseOptionService: MultiChooseOptionService,
  ) {}
}
