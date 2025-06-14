import { Injectable } from '@nestjs/common';
import { generateReference } from 'src/common/generateReference';
import { CreateReferralDto } from './dto/referral/create-referral.dto';
import { ReferralStatus } from './model/enums/ReferralStatus.enum';
import { UpdateReferralDto } from './dto/referral/update-referral.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Referral } from './entity/referral.entity';
import { Repository } from 'typeorm';
import { ReferralDetails } from './entity/referral-details.entity';

@Injectable()
export class ReferralService {
  constructor(
    @InjectRepository(Referral)
    private referralRepository: Repository<Referral>,

    @InjectRepository(ReferralDetails)
    private referralDetailsRepository: Repository<ReferralDetails>,
  ) {}

  async findAll(): Promise<Array<Referral>> {
    return this.referralRepository.find();
  }

  // TODO: findAllByReferee(refereeId: string): Array<Referral> { }

  async findOne(id: string): Promise<Referral | null> {
    return this.referralRepository.findOne({ where: { id } });
  }

  async findOneByReference(reference: string): Promise<Referral | null> {
    return this.referralRepository.findOne({ where: { reference } });
  }

  async create(createReferralDto: CreateReferralDto): Promise<Referral> {
    const { details, refereeId } = createReferralDto;

    const newDetails = this.referralDetailsRepository.create({
      ...details,
      parents: details.parents,
      children: details.children,
    });

    const newReferral = this.referralRepository.create({
      refereeId,
      reference: generateReference(),
      status: ReferralStatus.PENDING,
      details: newDetails,
    });

    return this.referralRepository.save(newReferral);
  }

  async update(
    id: string,
    updateReferralDto: UpdateReferralDto,
  ): Promise<Referral | null> {
    const referral = await this.referralRepository.findOne({ where: { id } });

    if (!referral) return null;

    Object.assign(referral, updateReferralDto);

    if (updateReferralDto.details) {
      if (!referral.details) {
        referral.details = this.referralDetailsRepository.create(
          updateReferralDto.details,
        );
      } else {
        Object.assign(referral.details, {
          ...updateReferralDto.details,
          parents: updateReferralDto.details.parents,
          children: updateReferralDto.details.children,
        });
      }

      await this.referralDetailsRepository.save(referral.details);
    }

    if (
      updateReferralDto.status === ReferralStatus.WITHDRAWN &&
      !referral.withdrawnAt
    ) {
      referral.withdrawnAt = new Date().toISOString();
    } else if (
      updateReferralDto.status !== ReferralStatus.WITHDRAWN &&
      referral.withdrawnAt
    ) {
      referral.withdrawnAt = undefined;
    }

    return this.referralRepository.save(referral);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.referralRepository.delete(id);
    return result.affected!! > 0;
  }

  // async addComment(
  //   referralId: string,
  //   createCommentDto: CreateCommentDto,
  // ): Promise<Comment> {
  //   const referral = await this.referralRepository.findOne({
  //     where: { id: referralId },
  //   });
  //   if (!referral) {
  //     throw new NotFoundException(`Referral with ID ${referralId} not found.`);
  //   }

  //   const newComment = this.commentRepository.create({
  //     authorId: createCommentDto.authorId,
  //     content: createCommentDto.content,
  //     referral: referral,
  //   });

  //   const savedComment = await this.commentRepository.save(newComment);

  //   return savedComment;
  // }

  // TODO: updateComment(id: string, updateCommentDto: UpdateCommentDto): ReferralComment {}
}
