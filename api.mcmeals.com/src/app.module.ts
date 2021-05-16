import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { ProductModule } from './product/product.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // Local
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: ["./entities/*.entity{.ts,.js}"],
      autoLoadEntities: true,
      synchronize: true
    }),
    // Docker
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   url: process.env.POSTGRES_URL, 
    //   entities: ["./entities/*.entity{.ts,.js}"],
    //   autoLoadEntities: true,
    //   synchronize: true
    // }),
    UserModule,
    AuthModule,
    CartModule,
    CategoryModule,
    SubcategoryModule,
    ProductModule,
    CartModule,
    CommentModule
  ],
})
export class AppModule {}
