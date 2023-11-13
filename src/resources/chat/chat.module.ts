import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entity/user.entity';
import { log } from 'console';
import { GroupModule } from './group/group.module';

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), GroupModule],
  providers: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {
  constructor() {
    log('Chat Module');
  }
}
