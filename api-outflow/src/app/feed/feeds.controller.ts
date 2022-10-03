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
import { CreateFeedDto } from './dto/create-feeds.dto';
import { UpdateFeedDto } from './dto/update-feeds.dto';
import { FeedService } from './feeds.service';



@Controller('api/v1/feeds')
export class FeedsController {
    constructor(private readonly feedService: FeedService) { }

    @Get()
    async index() {
        return await this.feedService.findAll();
    }

    @Post()
    async store(@Body() body: CreateFeedDto) {
        return await this.feedService.store(body);
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.feedService.findOneOrFail(id);
    }

    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateFeedDto,
    ) {
        return await this.feedService.update(id, body);
    }



    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.feedService.destroy(id);
    }
}
