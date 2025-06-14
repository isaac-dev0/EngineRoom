import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entity/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Referral } from 'src/referral/entity/referral.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,

    @InjectRepository(Referral)
    private referralRepository: Repository<Referral>,
  ) {}

  async findAllByReferral(referralId: string): Promise<Array<Comment>> {
    return this.commentRepository.find({
      where: { referral: { id: referralId } },
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(commentId: string): Promise<Comment | null> {
    return this.commentRepository.findOne({ where: { id: commentId } });
  }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const referral = await this.referralRepository.findOne({
      where: { id: createCommentDto.referralId },
    });
    if (!referral) {
      throw new NotFoundException(
        `Referral with ID ${createCommentDto.referralId} not found.`,
      );
    }

    const newComment = this.commentRepository.create({
      authorId: createCommentDto.authorId,
      content: createCommentDto.content,
      referral: referral,
    });

    const savedComment = await this.commentRepository.save(newComment);

    return savedComment;
  }

  async update(
    commentId: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment | undefined> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });

    if (!comment) return undefined;

    comment.content = updateCommentDto.content;
    comment.updatedAt = new Date().toISOString();

    const updatedComment = await this.commentRepository.save(comment);
    return updatedComment;
  }

  async delete(commentId: string): Promise<boolean> {
    const result = await this.commentRepository.delete(commentId);
    return result.affected! > 0;
  }
}
