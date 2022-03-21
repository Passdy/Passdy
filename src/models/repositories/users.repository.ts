import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/models/entities/users.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getUserByEmail(email: string): Promise<User> {
    return this.findOne({
      where: {
        email: email,
      },
    });
  }
}
