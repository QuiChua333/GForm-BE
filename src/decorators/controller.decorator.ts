import { applyDecorators, Controller } from '@nestjs/common';

export function InjectController({
  name = '',
  isCore = false,
}: {
  name: string;
  isCore?: boolean;
}) {
  return applyDecorators(Controller(!isCore ? name : ''));
}
