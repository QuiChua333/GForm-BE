import { Controller } from '@nestjs/common';
import { MultiChooseGridService } from './multi-choose-grid.service';

@Controller('multi-choose-grid')
export class MultiChooseGridController {
  constructor(
    private readonly multiChooseGridService: MultiChooseGridService,
  ) {}
}
