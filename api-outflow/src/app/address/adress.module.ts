import { AddressService } from './address.service';
import { AddressController } from './address.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { AddressEntity } from './address.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AddressEntity])],
    controllers: [AddressController],
    providers: [AddressService],
    exports: [AddressService],
  })
  export class AddressModule { }