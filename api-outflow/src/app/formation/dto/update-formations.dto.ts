import {

   IsOptional,
   IsString
} from 'class-validator';



export class UpdateFormationDto {
   @IsOptional()
   @IsString()
   institution: string;

   @IsOptional()
   @IsString()
   phoneNumber: string;

   @IsOptional()
   duration: string //date

   @IsOptional()
   especially: string

   @IsOptional()
   @IsString()
   description: string;



}                               