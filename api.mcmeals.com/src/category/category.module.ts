import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryEntity } from 'src/entities/category.entity';
import { ProductModule } from 'src/product/product.module';
import { SubcategoryModule } from 'src/subcategory/subcategory.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        forwardRef(() => SubcategoryModule),
        forwardRef(() => ProductModule),
        TypeOrmModule.forFeature([CategoryEntity]),
        AuthModule,
        UserModule,
    ]
})
export class CategoryModule {}
