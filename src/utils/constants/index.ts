import Time from './time';
import Exception from './exception';
import Firebase from './firebase';

const ROLES_KEY = 'roles';
const IS_PUBLIC_KEY = 'isPublic';

const Env = {
  STAGING: 'staging',
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
};

export { Env, ROLES_KEY, IS_PUBLIC_KEY, Exception, Time, Firebase };
