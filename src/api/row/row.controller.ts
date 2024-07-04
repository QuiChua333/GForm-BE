import { Body, Param } from '@nestjs/common';
import { RowService } from './row.service';
import { InjectController, InjectRoute } from '@/decorators';
import rowRoutes from './row.routes';

@InjectController({ name: rowRoutes.index })
export class RowController {
  constructor(private readonly rowService: RowService) {}

  @InjectRoute(rowRoutes.changeRow)
  async changeRow(@Body() body) {
    const response = await this.rowService.changeRow(body);
    return response;
  }

  @InjectRoute(rowRoutes.addRow)
  async addRow(@Body() body) {
    const response = await this.rowService.addRow(body);
    return response;
  }

  @InjectRoute(rowRoutes.deleteRow)
  async deleteRow(@Param('id') rowId: string) {
    const response = await this.rowService.deleteRow(rowId);
    return response;
  }
}
