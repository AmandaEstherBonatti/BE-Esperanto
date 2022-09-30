import {
   IsNotEmpty,
   IsNumber,
   IsObject,
   IsOptional,
   IsString
} from 'class-validator';
import { AddressEntity } from 'src/app/address/address.entity';
import { Gender } from 'src/app/client/enum/gender.enum';
import { UsersEntity } from 'src/app/user/users.entity';

export class CreateDoctorDto {
   @IsNotEmpty()
   @IsString()
   name: string;

   @IsNotEmpty()
   @IsString()
   lastName: string;


   @IsNotEmpty()
   birthday: Date;

   @IsNotEmpty()
   gender: Gender;

   @IsNotEmpty()
   @IsString()
   phoneNumber: string;

   @IsNotEmpty()
   localClinic: boolean;

   @IsOptional()
   Address: AddressEntity;

   @IsNotEmpty()
   User: UsersEntity;



}     
