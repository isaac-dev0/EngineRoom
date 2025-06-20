import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':referralId')
  @HttpCode(HttpStatus.OK)
  async findAllByReferral(@Param('referralId') referralId: string) {
    return this.commentService.findAllByReferral(referralId);
  }

  @Get(':commentId')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('commentId') commentId: string) {
    const comment = await this.commentService.findOne(commentId);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${commentId} not found.`);
    }
    return comment;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Put(':commentId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const updatedComment = await this.commentService.update(
      commentId,
      updateCommentDto,
    );
    if (!updatedComment) {
      throw new NotFoundException(`Comment with ID ${commentId} not found.`);
    }
    return updatedComment;
  }

  @Delete(':commentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('commentId') commentId: string) {
    const isDeleted = await this.commentService.delete(commentId);
    if (!isDeleted) {
      throw new NotFoundException(`Comment with ID ${commentId} not found.`);
    }
  }
}
