import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReferralService } from './referral.service';
import { CreateReferralDto } from './dto/referral/create-referral.dto';
import { UpdateReferralDto } from './dto/referral/update-referral.dto';

@Controller('referral')
export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}

  @Get()
  @HttpCode(200)
  async findAll() {
    return this.referralService.findAll();
  }

  @Get()
  @HttpCode(200)
  async findAllByReferee(refereeId: string) {
    return this.referralService.findAllByReferee(refereeId);
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    const referral = await this.referralService.findOne(id);
    if (!referral) {
      throw new NotFoundException(`Referral with ID ${id} not found.`);
    }
    return referral;
  }

  @Get(':reference')
  @HttpCode(200)
  async findOneByReference(@Param('reference') reference: string) {
    const referral = await this.referralService.findOneByReference(reference);
    if (!referral) {
      throw new NotFoundException(
        `Referral with reference ${reference} not found.`,
      );
    }
    return referral;
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createReferralDto: CreateReferralDto) {
    return this.referralService.create(createReferralDto);
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() updateReferralDto: UpdateReferralDto,
  ) {
    const updatedReferral = await this.referralService.update(
      id,
      updateReferralDto,
    );
    if (!updatedReferral) {
      throw new NotFoundException(`Referral with ID ${id} not found.`);
    }
    return updatedReferral;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const isDeleted = await this.referralService.delete(id);
    if (!isDeleted) {
      throw new NotFoundException(`Referral with ID ${id} not found.`);
    }
  }
}
