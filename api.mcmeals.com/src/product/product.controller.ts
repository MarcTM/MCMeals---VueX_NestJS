import { Body, Controller, Get, Post, UseGuards, Query, Param } from '@nestjs/common';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Product } from 'src/interfaces/product.interface';
import { UserRole } from 'src/interfaces/user.interface';
import { ProductService } from './product.service';


@Controller('product')
export class ProductController {
    constructor(
        private productService: ProductService
    ) {}


    // Create product
    // @hasRoles(UserRole.ADMIN)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    create(@Body() product: Product) {
        return this.productService.create(product);
    }


    // Find products
    @Get()
    findAll(
        @Query('categoryId') categoryId: number,
        @Query('subcategoryId') subcategoryId: number
    ) {
        if (categoryId == null && subcategoryId == null) {
            return this.productService.findAll();
        }
        // } else if (categoryId == null && subcategoryId) {
        //     return this.productService.findBySubcategory(subcategoryId);
        // } else if (categoryId && subcategoryId == null) {
        //     return this.productService.findByCategory(categoryId);
        // }
    }


    // Find one product
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.productService.findOne(id);
    }
}
