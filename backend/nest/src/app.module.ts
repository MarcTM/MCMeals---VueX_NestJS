import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MealsController } from './meals/meals.controller';
import { MealsService } from './meals/meals.service';
import { MealsModule } from './meals/meals.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true
    })
  ],
  controllers: [AppController, MealsController],
  providers: [AppService, MealsService],
})
export class AppModule {}
