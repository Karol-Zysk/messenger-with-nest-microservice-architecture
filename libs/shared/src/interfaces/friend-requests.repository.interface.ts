import { BaseInterfaceRepository } from '@app/shared';

import { FriendRequestEntity } from '../entities/friend-request.entity';

export type FriendRequestsRepositoryInterface =
  BaseInterfaceRepository<FriendRequestEntity>;
