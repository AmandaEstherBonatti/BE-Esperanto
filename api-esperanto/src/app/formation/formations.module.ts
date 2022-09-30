
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { FormationEntity } from './formations.entity';
import { FormationsController } from './formations.controller';
import { FormationService } from './formations.service';


@Module({
  imports: [TypeOrmModule.forFeature([FormationEntity])],
  controllers: [FormationsController],
  providers: [FormationService],
  exports: [FormationService],
})
export class FormationsModule { }