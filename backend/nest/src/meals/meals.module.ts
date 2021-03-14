import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';
import { MealSchema } from '../schemas/meals.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Meal', schema: MealSchema }])],
  controllers: [MealsController],
  providers: [MealsService],
})

export class MealsModule {}