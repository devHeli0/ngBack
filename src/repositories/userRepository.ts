import { UserModel } from "../frameworks/persistence/models";
import IUser from "../interfaces/IUser";

export default class UserRepository {
  constructor(private user = UserModel) {
    this.user= user;
  }
  
  async getAllUSers(): Promise<IUser[]> {
    const User = await this.user.findAll();
    return User;
  }
}
