import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CartEntity } from 'src/entities/cart.entity';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CartEntity]),
        AuthModule,
        UserModule
    ]
})
export class CartModule {}
