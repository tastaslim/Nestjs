import { log } from 'console';
import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';

@Module({
  providers: [GroupService],
  controllers: [GroupController],
})
export class GroupModule {
  constructor() {
    log('Group Module');
  }
}
