import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entity/comment.entity';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Referral } from 'src/referral/entity/referral.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Referral])],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
