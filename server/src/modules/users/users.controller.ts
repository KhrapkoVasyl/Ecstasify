import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { IdDto } from 'src/common/dto';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../auth/guards';

@ApiTags('users')
@Controller('users')
@UseGuards(AccessTokenGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param() conditions: IdDto): Promise<UserEntity> {
    return this.usersService.findOne(conditions);
  }

  @Post()
  createOne(@Body() createEntityDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.createOne(createEntityDto);
  }

  @Patch(':id')
  updateOne(
    @Param() conditions: IdDto,
    @Body() updateEntityDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.updateOne(conditions, updateEntityDto);
  }

  @Delete(':id')
  deleteOne(@Param() conditions: IdDto): Promise<UserEntity> {
    return this.usersService.deleteOne(conditions);
  }
}
