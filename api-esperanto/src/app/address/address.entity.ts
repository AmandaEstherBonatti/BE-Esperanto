import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Column,
    OneToOne,
  } from 'typeorm';
import { ClientEntity } from '../client/clients.entity';

  @Entity()
  export class AddressEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    cep: string;
  
    @Column()
    number: string;
  
    @Column()
    street: string;
  
    @Column()
    district: string;
  
    @Column()
    state: string;
  
    @Column()
    city: string;
  
    @Column()
    complement: string;

    @OneToOne(() => ClientEntity, (client) => client.Address)
    Client: ClientEntity;

  } 