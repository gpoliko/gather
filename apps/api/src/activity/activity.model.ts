import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ActivityType } from '@prisma/client';

import { User } from '../user/user.model';

registerEnumType(ActivityType, {
  name: 'ActivityType',
});

@ObjectType()
export class Activity {
  @Field(() => ID)
  id: string;

  @Field(() => ActivityType)
  type: ActivityType;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  location: string;

  @Field()
  participantCount: number;

  @Field()
  bahaiCount: number;

  @Field()
  startDate: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => User)
  user: User;

  @Field()
  userId: string;
}
