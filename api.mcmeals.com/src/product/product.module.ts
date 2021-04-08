import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryModule } from 'src/category/category.module';
import { ProductEntity } from 'src/entities/product.entity';
import { SubcategoryModule } from 'src/subcategory/subcategory.module';
import { UserModule } from 'src/user/user.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
    imports: [
        forwardRef(() => CategoryModule),
        forwardRef(() => SubcategoryModule),
        TypeOrmModule.forFeature([ProductEntity]),
        AuthModule,
        UserModule,
    ],
    providers: [ProductService],
    controllers: [ProductController],
    exports: [ProductService]
})
export class ProductModule {}
