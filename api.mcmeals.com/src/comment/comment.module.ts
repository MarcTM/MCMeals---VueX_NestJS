import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CommentEntity } from 'src/entities/comment.entity';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
    imports: [
        forwardRef(() => ProductModule),
        forwardRef(() => UserModule),
        TypeOrmModule.forFeature([CommentEntity]),
        AuthModule,
    ],
    providers: [CommentService],
    controllers: [CommentController],
    exports: [CommentService]
})
export class CommentModule {}
