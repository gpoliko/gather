import { Module } from '@nestjs/common';

import { ActivityService } from './activity.service';
import { ActivityResolver } from './activity.resolver';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  providers: [ActivityService, ActivityResolver],
  exports: [ActivityService],
})
export class ActivityModule {}