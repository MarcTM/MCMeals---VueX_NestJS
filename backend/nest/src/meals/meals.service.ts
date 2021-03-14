import { Injectable } from '@nestjs/common';
import { Meal } from '../interfaces/meals.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MealsService {
    constructor(
        @InjectModel('Meal') private readonly mealModel: Model<Meal>
    ) {}
}
