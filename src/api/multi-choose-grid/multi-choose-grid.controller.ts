import { Controller } from '@nestjs/common';
import { MultiChooseGridService } from './multi-choose-grid.service';
import { InjectController } from '@/decorators';
import multiChooseGridRoutes from './multi-choose-grid.routes';

@InjectController({ name: multiChooseGridRoutes.index })
export class MultiChooseGridController {
  constructor(
    private readonly multiChooseGridService: MultiChooseGridService,
  ) {}
}
