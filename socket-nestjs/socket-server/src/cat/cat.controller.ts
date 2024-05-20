import { Controller, Get, Post, Body } from '@nestjs/common';
import { CatsService } from './cat.service';
import { CreateCatDto } from './dto/CreateCatDto';
import { Cat } from './interface/cat.interface';


@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        console.log("abc")
        return this.catsService.create(createCatDto);
    }

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }
}