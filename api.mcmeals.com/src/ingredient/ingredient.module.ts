import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProductModule } from 'src/product/product.module';
import { IngredientEntity } from 'src/entities/ingredient.entity';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';

@Module({
    imports: [
        forwardRef(() => ProductModule),
        TypeOrmModule.forFeature([IngredientEntity]),
        AuthModule,
    ],
    providers: [IngredientService],
    controllers: [IngredientController],
    exports: [IngredientService]
})
export class IngredientModule {}
