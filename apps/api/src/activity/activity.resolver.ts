import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';

import { Activity } from './activity.model';
import { ActivityService } from './activity.service';
import { CreateActivityInput, UpdateActivityInput } from './activity.input';
import { User } from '../user/user.model';

@Resolver(() => Activity)
export class ActivityResolver {
  constructor(private activityService: ActivityService) {}

  @Query(() => [Activity])
  async activities() {
    return this.activityService.activities({});
  }

  @Query(() => Activity, { nullable: true })
  async activity(@Args('id') id: string) {
    return this.activityService.activity({ id });
  }

  @Mutation(() => Activity)
  async createActivity(@Args('input') input: CreateActivityInput) {
    const { userId, ...rest } = input;
    return this.activityService.createActivity({
      ...rest,
      user: { connect: { id: userId } },
    });
  }

  @Mutation(() => Activity)
  async updateActivity(
    @Args('id') id: string,
    @Args('input') input: UpdateActivityInput,
  ) {
    return this.activityService.updateActivity({
      where: { id },
      data: input,
    });
  }

  @Mutation(() => Activity)
  async deleteActivity(@Args('id') id: string) {
    return this.activityService.deleteActivity({ id });
  }

  @ResolveField(() => User)
  async user(@Parent() activity: Activity) {
    return this.activityService.getActivityUser(activity.id);
  }
} 