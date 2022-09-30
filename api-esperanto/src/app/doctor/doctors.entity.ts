import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AddressEntity } from "../address/address.entity";
import { Gender } from "../client/enum/gender.enum";
import { FormationEntity } from "../formation/formations.entity";
import { UsersEntity } from "../user/users.entity";

@Entity()
export class DoctorsEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    lastName: string

    @Column()
    birthday: Date;

    @Column()
    gender: Gender;

    @Column()
    phoneNumber: string;

    @Column()
    localClinic: boolean;

    @OneToOne(() => AddressEntity, {
        cascade: ['insert', 'update', 'remove'],
        orphanedRowAction: 'delete',
        eager: true,
        nullable: true
    })
    @JoinColumn()
    Address: AddressEntity;

    @OneToOne(() => UsersEntity, {
        cascade: ['insert', 'update', 'remove'],
        orphanedRowAction: 'delete',
        eager: true
    })
    @JoinColumn()
    User: UsersEntity;

    @OneToMany(() => FormationEntity, (formations) => formations.Doctor, {
        cascade: ['insert', 'update', 'remove'],
        orphanedRowAction: 'delete',
        nullable: true
    })
    @JoinColumn()
    Formations: FormationEntity[];
}