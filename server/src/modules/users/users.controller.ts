import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { IdDto } from 'src/common/dto';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

@ApiTags('users')
@Controller('users')
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
    const model = plainToInstance(UserEntity, createEntityDto);

    return this.usersService.createOne(model);
  }

  @Patch(':id')
  updateOne(
    @Param() conditions: IdDto,
    @Body() updateEntityDto: UpdateUserDto,
  ) {
    const model = plainToInstance(UserEntity, updateEntityDto);

    return this.usersService.updateOne(conditions, model);
  }

  @Delete(':id')
  deleteOne(@Param() conditions: IdDto) {
    return this.usersService.deleteOne(conditions);
  }
}
