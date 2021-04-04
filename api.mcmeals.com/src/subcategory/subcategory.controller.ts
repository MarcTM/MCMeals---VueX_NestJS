import { Body, Controller, Get, Post, UseGuards, Query, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Subcategory } from 'src/interfaces/subcategory.interface';
import { UserRole } from 'src/interfaces/user.interface';
import { SubcategoryService } from './subcategory.service';


@Controller('subcategory')
export class SubcategoryController {
    constructor(
        private subcategoryService: SubcategoryService
    ) {}


    // Create subcategory
    // @hasRoles(UserRole.ADMIN)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    create(@Body() subcategory: Subcategory): Observable<Subcategory> {
        return this.subcategoryService.create(subcategory);
    }


    // Find subcategories
    @Get()
    findAll(@Query('categoryId') categoryId: number): Observable<Subcategory[]> {
        if (categoryId == null) {
            return this.subcategoryService.findAll();
        } else {
            return this.subcategoryService.findByCategory(categoryId);
        }
    }


    // Find one subcategory
    @Get(':id')
    findOne(@Param('id') id: number): Observable<Subcategory> {
        return this.subcategoryService.findOne(id);
    }
}
