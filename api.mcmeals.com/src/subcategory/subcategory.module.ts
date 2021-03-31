import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryModule } from 'src/category/category.module';
import { SubcategoryEntity } from 'src/entities/subcategory.entity';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        forwardRef(() => CategoryModule),
        forwardRef(() => ProductModule),
        TypeOrmModule.forFeature([SubcategoryEntity]),
        AuthModule,
        UserModule,
    ]
})
export class SubcategoryModule {}
