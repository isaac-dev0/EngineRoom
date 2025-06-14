import {
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':referralId')
  @HttpCode(200)
  async findAllByReferral(@Param('referralId') referralId: string) {
    return this.commentService.findAllByReferral(referralId);
  }

  @Get(':commentId')
  @HttpCode(200)
  async findOne(@Param('commentId') commentId: string) {
    const comment = await this.commentService.findOne(commentId);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${commentId} not found.`);
    }
    return comment;
  }
}
