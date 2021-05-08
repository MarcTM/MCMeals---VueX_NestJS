import { Body, Controller, Get, Post, UseGuards, Query, Param, Put, Delete } from '@nestjs/common';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Ingredient } from 'src/interfaces/ingredient.interface';
import { UserRole } from 'src/interfaces/user.interface';
import { IngredientService } from './ingredient.service';


@Controller('ingredient')
export class IngredientController {
    constructor(
        private ingredientService: IngredientService
    ) {}


    // Create ingredient
    // @hasRoles(UserRole.ADMIN)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    create(@Body() ingredient: Ingredient) {
        return this.ingredientService.create(ingredient);
    }


    // Get all ingredients
    @Get()
    findAll() {
        return this.ingredientService.findAll();
    }

    
    // Find one ingredient
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.ingredientService.findOne(id);
    }


    // Update ingredient
    // @hasRoles(UserRole.ADMIN)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    updateOne(
        @Param('id') id: number,
        @Body() ingredient: Ingredient
    ) {
        return this.ingredientService.updateOne(id, ingredient);
    }


    // Delete ingredient
    // @hasRoles(UserRole.ADMIN)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    deleteOne(@Param('id') id: number) {
        return this.ingredientService.deleteOne(id);
    }
}
