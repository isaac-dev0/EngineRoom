import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SupabaseClient, UserIdentity } from '@supabase/supabase-js';
import { Roles } from 'src/common/rbac/role.decorator';
import { Role } from 'src/common/rbac/role.enum';
import { RolesGuard } from 'src/common/rbac/role.guard';
import { SUPABASE_CLIENT } from 'src/core/supabase/supabase.module';
import { CurrentUser } from './decorator/current-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@UseGuards(AuthGuard('supabase-jwt'), RolesGuard)
export class UserController {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabaseClient: SupabaseClient,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN)
  async findAll(@CurrentUser() user: UserIdentity) {
    // TODO: Service layer
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(Role.ADMIN, Role.VOLUNTEER)
  async findOne(@Param('id') id: string) {
    // TODO: Service layer
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.ADMIN)
  async create(@Body() createUserDto: CreateUserDto) {
    // TODO: Service layer
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.ADMIN)
  async delete(@Param('id') id: string) {
    // TODO: Service layer
  }
}
