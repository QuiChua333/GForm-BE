import { Env } from '@/utils/constants';

import bcryptPassword from './bcryptPassword';
import enumh from './enumh';
import entity from './entity';

const getEnv = (): string => process.env.NODE_ENV || Env.DEVELOPMENT;

const isDevelopmentEnv = (): boolean => getEnv() !== Env.PRODUCTION;

export { getEnv, isDevelopmentEnv, bcryptPassword, enumh, entity };
