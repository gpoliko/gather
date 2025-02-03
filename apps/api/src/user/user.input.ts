import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  name: string;

  @Field()
  locality: string;

  @Field(() => UserRole, { defaultValue: UserRole.GENERAL })
  role?: UserRole;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  locality?: string;

  @Field(() => UserRole, { nullable: true })
  role?: UserRole;
}
