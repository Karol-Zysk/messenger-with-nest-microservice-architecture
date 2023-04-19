import { Module } from '@nestjs/common';
import { PresenceController } from './presence.controller';
import { PresenceService } from './presence.service';
import { SharedModule, RedisModule } from '@app/shared';

@Module({
  imports: [SharedModule, RedisModule],
  controllers: [PresenceController],
  providers: [PresenceService],
})
export class PresenceModule {}
