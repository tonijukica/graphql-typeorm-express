import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import bcrypt from 'bcrypt';
import { User } from '../../Entity/User';
import { RegisterInput } from './Register/RegisterInput';

@Resolver(User)
export class RegisterResolver{
  @Query(() => String)
  async hello() {
    return 'Hello';
  }


  @Mutation(() => User)
  async register(
    @Arg('input') {firstName, lastName, email, password}: RegisterInput,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 15);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();

    return user;
  }
}
