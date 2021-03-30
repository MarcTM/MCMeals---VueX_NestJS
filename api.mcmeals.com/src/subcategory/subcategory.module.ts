import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryModule } from 'src/category/category.module';
import { SubcategoryEntity } from 'src/entities/subcategory.entity';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([SubcategoryEntity]),
        AuthModule,
        UserModule,
        CategoryModule
    ]
})
export class SubcategoryModule {}
