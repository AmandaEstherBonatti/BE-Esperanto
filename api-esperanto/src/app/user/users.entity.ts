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
    JoinColumn
} from 'typeorm';

@Entity()
export class UsersEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    password: string

    @OneToOne(() => ClientEntity, (client) => client.User, {nullable: true})
    Client: ClientEntity

}