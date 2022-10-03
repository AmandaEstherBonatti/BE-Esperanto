import { ClientEntity } from './../client/clients.entity';
import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToOne,
    JoinColumn,
    OneToMany,
    ManyToMany
} from 'typeorm';
import { DoctorsEntity } from '../doctor/doctors.entity';
import { Role } from './enum/role.enum';
import { FeedPostEntity } from '../feed/feeds.entity';
import { hashSync } from 'bcrypt';
import { ConversationEntity } from '../chat/entitys/conversation.entity';
import { MessageEntity } from '../chat/entitys/message.entity';
import { FriendRequestEntity } from '../friend-request/friend-request.entity';

@Entity()
export class UsersEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    password: string

    @Column({ type: 'enum', enum: Role, default: Role.USER, nullable: true })
    role: Role;


    @OneToOne(() => ClientEntity, (client) => client.User, { nullable: true })
    Client: ClientEntity

    @OneToOne(() => DoctorsEntity, (doctor) => doctor.User, { nullable: true })
    Doctor: DoctorsEntity

    @OneToMany(() => FeedPostEntity, (feedPostEntity) => feedPostEntity.User, { nullable: true })
    feedPosts: FeedPostEntity[];

    @ManyToMany(
        () => ConversationEntity,
        (conversationEntity) => conversationEntity.Users,
    )
    Conversations: ConversationEntity[];


    @OneToMany(() => MessageEntity, (messageEntity) => messageEntity.User)
    Messages: MessageEntity[];

    @OneToMany(
        () => FriendRequestEntity,
        (friendRequest) => friendRequest.Creator,
    )
    SentFriendRequests: FriendRequestEntity[];

    @OneToMany(
        () => FriendRequestEntity,
        (friendRequest) => friendRequest.Receiver,
    )
    ReceivedFriendRequests: FriendRequestEntity[];

    @BeforeInsert()
    hasPassword() {
        this.password = hashSync(this.password, 10);
    }
}