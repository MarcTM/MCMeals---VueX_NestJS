import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Category } from 'src/interfaces/category.interface';
import { UserRole } from 'src/interfaces/user.interface';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {

    constructor(
        private categoryService: CategoryService
    ) {}


    // Create category
    // @hasRoles(UserRole.ADMIN)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    create(@Body() category: Category) {
        return this.categoryService.create(category);
    }


    // Get all categories
    @Get()
    findAll() {
        return this.categoryService.findAll();
    }


    // Get category by slug
    @Get(':slug')
    findOne(@Param('slug') slug: string) {
        return this.categoryService.findOne(slug);
    }


    // Update category
    // @hasRoles(UserRole.ADMIN)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    updateOne(
        @Param('id') id: string,
        @Body() category: Category
    ) {
        return this.categoryService.updateOne(Number(id), category);
    }


    // Delete category
    // @hasRoles(UserRole.ADMIN)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    deleteOne(@Param('id') id: string) {
        return this.categoryService.deleteOne(Number(id));
    }
}
