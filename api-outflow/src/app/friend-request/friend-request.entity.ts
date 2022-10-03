import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '../user/users.entity';
import { Status } from './enum/status.enum';

@Entity()
export class FriendRequestEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UsersEntity, (userEntity) => userEntity.SentFriendRequests)
  Creator: UsersEntity;

  @ManyToOne(
    () => UsersEntity,
    (userEntity) => userEntity.ReceivedFriendRequests,
  )
  Receiver: UsersEntity;

  @Column()
  status: Status;
}
