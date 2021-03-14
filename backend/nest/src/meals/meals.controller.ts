import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { MealsService } from './meals.service';

@Controller('meals')
export class MealsController {
    constructor(
        private readonly mealsService: MealsService
    ) {}

    @Get()
    get(): string {
        return 'get';
    }

    @Post()
    post(): string {
        return 'post';
    }

    @Put()
    put(): string {
        return 'put';
    }

    @Delete()
    delete(): string {
        return 'delete';
    }
}
