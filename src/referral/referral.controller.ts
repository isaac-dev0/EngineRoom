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
import { ReferralService } from './referral.service';
import { CreateReferralDto } from './dto/referral/create-referral.dto';
import { UpdateReferralDto } from './dto/referral/update-referral.dto';

@Controller('referral')
export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.referralService.findAll();
  }

  @Get(':refereeId')
  @HttpCode(HttpStatus.OK)
  async findAllByReferee(@Param('referralId') refereeId: string) {
    return this.referralService.findAllByReferee(refereeId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const referral = await this.referralService.findOne(id);
    if (!referral) {
      throw new NotFoundException(`Referral with ID ${id} not found.`);
    }
    return referral;
  }

  @Get(':reference')
  @HttpCode(HttpStatus.OK)
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
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createReferralDto: CreateReferralDto) {
    return this.referralService.create(createReferralDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
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
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    const isDeleted = await this.referralService.delete(id);
    if (!isDeleted) {
      throw new NotFoundException(`Referral with ID ${id} not found.`);
    }
  }
}
