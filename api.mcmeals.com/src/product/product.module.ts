import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CartModule } from 'src/cart/cart.module';
import { CategoryModule } from 'src/category/category.module';
import { CommentModule } from 'src/comment/comment.module';
import { ProductEntity } from 'src/entities/product.entity';
import { SubcategoryModule } from 'src/subcategory/subcategory.module';
import { UserModule } from 'src/user/user.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
    imports: [
        forwardRef(() => UserModule),
        forwardRef(() => CategoryModule),
        forwardRef(() => SubcategoryModule),
        forwardRef(() => CartModule),
        forwardRef(() => CommentModule),
        TypeOrmModule.forFeature([ProductEntity]),
        AuthModule,
    ],
    providers: [ProductService],
    controllers: [ProductController],
    exports: [ProductService]
})
export class ProductModule {}
