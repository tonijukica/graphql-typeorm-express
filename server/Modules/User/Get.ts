import { Resolver, Ctx, Query } from 'type-graphql';
import { User } from '../../Entity/User';
import { IContext } from '../../Types';

@Resolver(User)
export class GetResolver{
 @Query(() => User, { nullable: true })
 async getUser(@Ctx() ctx: IContext): Promise<User | undefined>{
  if(!ctx.req.session!.userId)
    return undefined;

  const id = ctx.req.session!.userId
  const user = await User.findOne({ where: { id }});

  return user;
  }
}
