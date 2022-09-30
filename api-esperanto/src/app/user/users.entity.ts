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
    OneToMany
} from 'typeorm';
import { DoctorsEntity } from '../doctor/doctors.entity';
import { Role } from './enum/role.enum';
import { FeedPostEntity } from '../feed/feeds.entity';

@Entity()
export class UsersEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    password: string

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: Role;


    @OneToOne(() => ClientEntity, (client) => client.User, { nullable: true })
    Client: ClientEntity

    @OneToOne(() => DoctorsEntity, (doctor) => doctor.User, { nullable: true })
    Doctor: DoctorsEntity

    @OneToMany(() => FeedPostEntity, (feedPostEntity) => feedPostEntity.User, { nullable: true })
    feedPosts: FeedPostEntity[];

}