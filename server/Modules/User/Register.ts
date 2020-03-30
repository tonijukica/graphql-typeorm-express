import { Resolver, Query, Mutation, Arg, FieldResolver, Root } from 'type-graphql';
import * as bcrypt from 'bcrypt';
import { User } from '../../Entity/User';

@Resolver(User)
export class RegisterResolver{
  @Query(() => String)
  async hello() {
    return 'Hello';
  }

  @FieldResolver()
  async name(@Root() parent: User) {
    return `${parent.firstName} ${parent.lastName}`
  }

  @Mutation(() => User)
  async register(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('email') email: string,
    @Arg('password') password: string
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
