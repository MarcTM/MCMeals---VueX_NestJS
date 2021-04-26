import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { SubcategoryEntity } from 'src/entities/subcategory.entity';
import { ProductModule } from 'src/product/product.module';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryController } from './subcategory.controller';

@Module({
    imports: [
        forwardRef(() => CategoryModule),
        forwardRef(() => ProductModule),
        TypeOrmModule.forFeature([SubcategoryEntity]),
    ],
    providers: [SubcategoryService],
    controllers: [SubcategoryController],
    exports: [SubcategoryService]
})
export class SubcategoryModule {}
