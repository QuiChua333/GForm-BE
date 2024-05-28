import { Controller } from '@nestjs/common';
import { GColumnService } from './gcolumn.service';

@Controller('row')
export class GColumnController {
  constructor(private readonly gcolumnService: GColumnService) {}
}
