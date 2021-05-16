import { Body, Controller, Get, Post, UseGuards, Query, Param, Put, Delete } from '@nestjs/common';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Category } from 'src/interfaces/category.interface';
import { Product } from 'src/interfaces/product.interface';
import { UserRole } from 'src/interfaces/user.interface';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {}


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
        @Query('subcategoryId') subcategoryId: number,
        @Query('limit') limit: number,
        @Query('search') search: string,
    ) {
        if (categoryId == null && subcategoryId == null) {
            return this.productService.findAll(limit, search);
        } else if (categoryId == null && subcategoryId) {
            return this.productService.findBySubcategory(subcategoryId, limit, search);
        } else if (categoryId && subcategoryId == null) {
            return this.productService.findByCategory(categoryId, limit, search);
        }
    }


    // Find related to product
    @Get("related")
    relatedToProduct(
        @Query('slug') slug: string,
        @Query('category') category: Category,
        @Query('type') type: string,
    ) {
        return this.productService.relatedToProduct(slug, type, category);
    }


    // Find products
    @Get('/popular')
    findMostVisited() {
        return this.productService.findMostVisited();
    }


    // Find one product
    @Get(':slug')
    findOne(@Param('slug') slug: string) {
        return this.productService.findOne(slug);
    }


    // Update product
    // @hasRoles(UserRole.ADMIN)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    updateOne(
        @Param('id') id: number,
        @Body() product: Product
    ) {
        return this.productService.updateOne(id, product);
    }


    // Delete product
    // @hasRoles(UserRole.ADMIN)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    deleteOne(@Param('id') id: number) {
        return this.productService.deleteOne(id);
    }
}
