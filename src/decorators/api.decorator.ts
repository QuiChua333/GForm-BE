import {
  Get,
  Put,
  Post,
  Delete,
  HttpCode,
  UseGuards,
  HttpStatus,
  SetMetadata,
  RequestMethod,
  applyDecorators,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';

import type { CustomDecorator } from '@nestjs/common';

import { JwtAuthGuard, LocalAuthGuard } from '@/api/auth/guards';
import { IS_PUBLIC_KEY, ROLES_KEY } from '@/utils/constants';

import type { UserRole } from '@/common/enums';

export interface IRouteParams {
  path: string;
  code?: number;
  method: number;
  roles?: UserRole[];
  jwtSecure?: boolean;
  localSecure?: boolean;
}

function Public(): CustomDecorator<string> {
  return SetMetadata(IS_PUBLIC_KEY, true);
}

export function UserRoles(roles: UserRole[]): CustomDecorator<string> {
  return SetMetadata(ROLES_KEY, roles);
}

export function InjectRoute({
  path = '/',
  jwtSecure = true,
  localSecure = false,
  code = HttpStatus.OK,
  method = RequestMethod.GET,
}: IRouteParams) {
  const methodDecorator = {
    [RequestMethod.GET]: Get,
    [RequestMethod.PUT]: Put,
    [RequestMethod.POST]: Post,
    [RequestMethod.DELETE]: Delete,
  };

  const decorators = [methodDecorator[method](path), HttpCode(code)];

  if (!jwtSecure) {
    decorators.push(Public());
  } else {
    decorators.push(UseGuards(JwtAuthGuard));
  }

  if (localSecure) {
    decorators.push(UseGuards(LocalAuthGuard));
  }

  return applyDecorators(...decorators);
}

export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.element;
  },
);
