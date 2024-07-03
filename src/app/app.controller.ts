import { InjectController } from '@/decorators';
import { Get } from '@nestjs/common';

@InjectController({
  name: 'core',
  isCore: true,
})
export class AppController {
  @Get()
  welcome() {
    return 'Welcome Server';
  }
}
