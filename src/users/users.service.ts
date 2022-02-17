import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  findByNumber(usernamber: number) {
    return this.users.find((user)=>user.usernumber == usernamber,)
  }
  private users: User[] = [{ id: 0, usernumber: 12345 }];

  findAll(): User[] {
    return this.users;
  }

  findById(id: number): User {
    return this.users.find((user) => user.id == id);
  }

}
