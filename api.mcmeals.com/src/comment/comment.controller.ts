import { Body, Controller, Get, Post, UseGuards, Param } from '@nestjs/common';
import { hasRoles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/interfaces/user.interface';
import { Comment } from 'src/interfaces/comment.interface';
import { CommentService } from './comment.service';


@Controller('comment')
export class CommentController {
    constructor(
        private commentService: CommentService
    ) {}


    // Add comment
    // @hasRoles(UserRole.ADMIN)
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    add(@Body() comment: Comment) {
        return this.commentService.add(comment);
    }


    // Get product's comments
    @Get(':productId')
    findByUser(@Param('productId') productId: number) {
        return this.commentService.findByProduct(productId);
    }
}
