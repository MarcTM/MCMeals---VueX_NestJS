import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { CategoryEntity } from 'src/entities/category.entity';
import { Product } from 'src/interfaces/product.interface';
import { Ingredient } from 'src/interfaces/ingredient.interface';
import { IngredientEntity } from 'src/entities/ingredient.entity';


@Injectable()
export class IngredientService {

    constructor(@InjectRepository(IngredientEntity) private readonly ingredientRepository: Repository<IngredientEntity>) {}


    // Create ingredient
    create(ingredient: Ingredient) {
        return this.ingredientRepository.save(ingredient);
    }


    // Get all ingredients
    findAll() {
        return this.ingredientRepository.find();
    }


    // Get one ingredient
    findOne(id: number) {
        return this.ingredientRepository.findOne({ id });
    }


    // Update ingredient
    updateOne(id: number, ingredient: Ingredient) {
        return this.ingredientRepository.update(id, ingredient);
    }


    // Delete ingredient
    deleteOne(id: number) {
        return this.ingredientRepository.delete(id);
    }
}
