import { InputType, Field } from '@nestjs/graphql';
import { ActivityType } from '@prisma/client';

@InputType()
export class CreateActivityInput {
  @Field(() => ActivityType)
  type: ActivityType;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  location: string;

  @Field({ defaultValue: 0 })
  participantCount?: number;

  @Field({ defaultValue: 0 })
  bahaiCount?: number;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date, { nullable: true })
  endDate?: Date;

  @Field()
  userId: string;
}

@InputType()
export class UpdateActivityInput {
  @Field(() => ActivityType, { nullable: true })
  type?: ActivityType;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  participantCount?: number;

  @Field({ nullable: true })
  bahaiCount?: number;

  @Field(() => Date, { nullable: true })
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  endDate?: Date;
}
