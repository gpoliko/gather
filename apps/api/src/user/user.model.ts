import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

import { Activity } from '../activity/activity.model';

registerEnumType(UserRole, {
    name: 'UserRole',
});

@ObjectType()
export class User {
    @Field(() => ID)
    id: string;

    @Field()
    email: string;

   @Field()
    password: string;

    @Field()
    name: string;

    @Field(() => UserRole)
    role: UserRole;

    @Field()
    locality: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    @Field(() => [Activity])
    activities: Activity[];
}