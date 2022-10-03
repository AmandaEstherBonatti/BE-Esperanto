import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DoctorsEntity } from "../doctor/doctors.entity";


@Entity()
export class FormationEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    institution: string;

    @Column()
    phoneNumber: string;

    @Column()
    duration: string //date

    @Column()
    especially: string

    @Column()
    description: string;

    @ManyToOne(() => DoctorsEntity, doctor => doctor.Formations)
    Doctor: DoctorsEntity;

}