import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryEntity } from 'src/entities/category.entity';
import { SubcategoryModule } from 'src/subcategory/subcategory.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CategoryEntity]),
        AuthModule,
        UserModule,
        SubcategoryModule
    ]
})
export class CategoryModule {}
