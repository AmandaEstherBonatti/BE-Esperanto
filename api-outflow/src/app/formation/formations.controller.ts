import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { CreateFormationDto } from './dto/create-formations.dto';
import { UpdateFormationDto } from './dto/update-formations.dto';
import { FormationService } from './formations.service';



@Controller('api/v1/formations')
export class FormationsController {
    constructor(private readonly formationService: FormationService) { }

    @Get()
    async index() {
        return await this.formationService.findAll();
    }

    @Post()
    async store(@Body() body: CreateFormationDto) {
        return await this.formationService.store(body);
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.formationService.findOneOrFail(id);
    }

    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateFormationDto,
    ) {
        return await this.formationService.update(id, body);
    }



    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.formationService.destroy(id);
    }
}
