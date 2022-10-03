import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { CreateFormationDto } from "./dto/create-formations.dto";
import { UpdateFormationDto } from "./dto/update-formations.dto";

import { FormationEntity } from "./formations.entity";



@Injectable()
export class FormationService {
  constructor(
    @InjectRepository(FormationEntity)
    private readonly formationRepository: Repository<FormationEntity>,
  ) { }

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
    };
    return await this.formationRepository.find(options);
  }

  async findOneOrFail(id: string) {
    try {
      return await this.formationRepository.findOneBy({ id });
    } catch {
      throw new NotFoundException();
    }
  }

  async store(data: CreateFormationDto) {
    const formation = this.formationRepository.create(data);
    return await this.formationRepository.save(formation);
  }

  async update(id: string, data: UpdateFormationDto) {
    try {
      await this.formationRepository.findOneById(id);
    } catch {
      throw new NotFoundException();
    }
    return await this.formationRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    try {
      await this.formationRepository.findOneById(id);
    } catch {
      throw new NotFoundException();
    }
    return await this.formationRepository.softDelete({ id });
  }
}


