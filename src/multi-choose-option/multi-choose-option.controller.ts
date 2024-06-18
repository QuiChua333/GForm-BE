import { Controller } from '@nestjs/common';
import { MultiChooseOptionService } from './multi-choose-option.service';

@Controller('multi-choose-option')
export class MultiChooseOptionController {
  constructor(
    private readonly multiChooseOptionService: MultiChooseOptionService,
  ) {}
}
