import { Body, Controller, Get, Post, UseGuards, Param, Put, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { Comment } from 'src/interfaces/comment.interface';
import { CommentService } from './comment.service';


@Controller('comment')
export class CommentController {

    constructor(private commentService: CommentService) {}


    // Add comment
    // @UseGuards(JwtAuthGuard)
    @Post()
    add(@Body() comment: Comment) {
        return this.commentService.add(comment);
    }


    // Get product's comments
    @Get(':productId')
    findByUser(@Param('productId') productId: number) {
        return this.commentService.findByProduct(productId);
    }


    // Update comment
    // @UseGuards(JwtAuthGuard, UserIsUser)
    @Put(':id')
    updateComment(
        @Param('id') id: number,
        @Body() comment: Comment
    ) {
        return this.commentService.updateComment(id, comment);
    }


    // Delete comment
    // @UseGuards(JwtAuthGuard, UserIsUser)
    @Delete(':id')
    deleteCart(@Param('id') id: number) {
        return this.commentService.deleteComment(id);
    }
}
