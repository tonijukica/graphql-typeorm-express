import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import bcrypt from 'bcrypt';
import { User } from '../../Entity/User';
import { IContext } from '../../Types';

@Resolver(User)
export class LoginResolver{
  @Mutation(() => User, { nullable: true})
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: IContext
  ): Promise<User | string> {
    const user = await User.findOne({where: { email }});
    if(!user) 
      return 'Incorrect email/password';

    const check = await bcrypt.compare(password, user.password);

    if(!check)
      return 'Incorrect login information';

    ctx.req.session!.userId = user.id;


    return user;
  }
}
