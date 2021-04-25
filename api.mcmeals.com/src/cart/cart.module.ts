import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CartEntity } from 'src/entities/cart.entity';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
    imports: [
        forwardRef(() => ProductModule),
        forwardRef(() => UserModule),
        TypeOrmModule.forFeature([CartEntity]),
        AuthModule,
        UserModule,
    ],
    providers: [CartService],
    controllers: [CartController],
    exports: [CartService]
})
export class CartModule {}
