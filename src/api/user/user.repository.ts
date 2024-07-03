import { Repository } from 'typeorm';

import { User } from './entities';

export class UserRepository extends Repository<User> {}
