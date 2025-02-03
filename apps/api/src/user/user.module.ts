import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}