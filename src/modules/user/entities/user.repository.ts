import { dataSource } from 'src/database/data-source';
import { User } from './user.entity';

export const userRepository = dataSource.getRepository(User);
