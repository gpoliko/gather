import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';

import { User } from './user.model';
import { UserService } from './user.service';
import { CreateUserInput, UpdateUserInput } from './user.input';
import { Activity } from '../activity/activity.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async users() {
    return this.userService.users({});
  }

  @Query(() => User, { nullable: true })
  async user(@Args('id') id: string) {
    return this.userService.user({ id });
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UpdateUserInput,
  ) {
    return this.userService.updateUser({
      where: { id },
      data: input,
    });
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: string) {
    return this.userService.deleteUser({ id });
  }

  @ResolveField(() => [Activity])
  async activities(@Parent() user: User) {
    return this.userService.getUserActivities(user.id);
  }
} 