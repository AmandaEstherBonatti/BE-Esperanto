import {
   IsNotEmpty,
   IsNumber,
   IsObject,
   IsOptional,
   IsString
} from 'class-validator';
import { DoctorsEntity } from 'src/app/doctor/doctors.entity';



export class CreateFormationDto {
   @IsNotEmpty()
   @IsString()
   institution: string;

   @IsNotEmpty()
   @IsString()
   phoneNumber: string;


   @IsNotEmpty()
   duration: string //date

   @IsNotEmpty()
   @IsString()
   especially: string

   @IsNotEmpty()
   description: string;

   @IsNotEmpty()
   Doctor: DoctorsEntity;

}                               