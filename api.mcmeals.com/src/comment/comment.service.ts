import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from 'src/entities/cart.entity';
import { Comment } from 'src/interfaces/comment.interface';
import { CommentEntity } from 'src/entities/comment.entity';


@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CartEntity) private readonly commentRepository: Repository<CommentEntity>,
    ) {}


    // Add comment
    add(comment: Comment) {
        return this.commentRepository.save(comment);
    }


    // Get product's comments
    findByProduct(productId: number) {
        return this.commentRepository
            .createQueryBuilder("comment")
            .leftJoinAndSelect("comment.user", "user")
            .leftJoinAndSelect("comment.product", "product")
            .where("product.id = :id", { id: productId })
            .getMany();
    }
}
