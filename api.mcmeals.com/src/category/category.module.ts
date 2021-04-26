import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities/category.entity';
import { ProductModule } from 'src/product/product.module';
import { SubcategoryModule } from 'src/subcategory/subcategory.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
    imports: [
        forwardRef(() => SubcategoryModule),
        forwardRef(() => ProductModule),
        TypeOrmModule.forFeature([CategoryEntity]),
    ],
    providers: [CategoryService],
    controllers: [CategoryController],
    exports: [CategoryService]
})
export class CategoryModule {}
