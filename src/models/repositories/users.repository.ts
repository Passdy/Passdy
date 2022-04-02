import { EntityRepository, Like, Repository } from 'typeorm';
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

  async getListUser(
    full_name: string,
    phone_number: string,
    email: string,
    role: string,
  ): Promise<User[]> {
    const condition = {};
    if (full_name) condition['full_name'] = Like(`%${full_name}%`);
    if (phone_number) condition['phone'] = Like(`%${phone_number}%`);
    if (email) condition['email'] = Like(`%${email}%`);
    if (role) condition['role'] = role;
    return await this.find({
      where: condition,
    });
  }

  async getUserById(userId: number): Promise<User> {
    return await this.findOne({
      where: {
        id: userId,
      },
    });
  }
}
