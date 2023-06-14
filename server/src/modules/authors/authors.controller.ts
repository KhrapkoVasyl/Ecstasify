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
import { AuthorsService } from './authors.service';
import { AuthorEntity } from './author.entity';
import { IdDto } from 'src/common/dto';
import { CreateAuthorDto, UpdateAuthorDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

@ApiTags('authors')
@Controller('authors')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  findAll(): Promise<AuthorEntity[]> {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param() conditions: IdDto): Promise<AuthorEntity> {
    return this.authorsService.findOne(conditions);
  }

  @Post()
  createOne(@Body() createEntityDto: CreateAuthorDto): Promise<AuthorEntity> {
    const model = plainToInstance(AuthorEntity, createEntityDto);

    return this.authorsService.createOne(model);
  }

  @Patch(':id')
  updateOne(
    @Param() conditions: IdDto,
    @Body() updateEntityDto: UpdateAuthorDto,
  ) {
    const model = plainToInstance(AuthorEntity, updateEntityDto);

    return this.authorsService.updateOne(conditions, model);
  }

  @Delete(':id')
  deleteOne(@Param() conditions: IdDto) {
    return this.authorsService.deleteOne(conditions);
  }
}
