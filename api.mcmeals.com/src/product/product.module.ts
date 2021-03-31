import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryModule } from 'src/category/category.module';
import { ProductEntity } from 'src/entities/product.entity';
import { SubcategoryModule } from 'src/subcategory/subcategory.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        forwardRef(() => CategoryModule),
        forwardRef(() => SubcategoryModule),
        TypeOrmModule.forFeature([ProductEntity]),
        AuthModule,
        UserModule,
    ]
})
export class ProductModule {}
