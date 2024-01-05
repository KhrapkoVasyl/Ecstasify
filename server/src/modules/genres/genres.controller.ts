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
import { GenresService } from './genres.service';
import { GenreEntity } from './genre.entity';
import { IdDto } from 'src/common/dto';
import { CreateGenreDto, UpdateGenreDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { AccessTokenGuard } from '../auth/guards';

@ApiTags('genres')
@Controller('genres')
@UseGuards(AccessTokenGuard)
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  findAll(): Promise<GenreEntity[]> {
    return this.genresService.findAll();
  }

  @Get(':id')
  findOne(@Param() conditions: IdDto): Promise<GenreEntity> {
    return this.genresService.findOne(conditions);
  }

  @Post()
  createOne(@Body() createEntityDto: CreateGenreDto): Promise<GenreEntity> {
    const model = plainToInstance(GenreEntity, createEntityDto);

    return this.genresService.createOne(model);
  }

  @Patch(':id')
  updateOne(
    @Param() conditions: IdDto,
    @Body() updateEntityDto: UpdateGenreDto,
  ): Promise<GenreEntity> {
    const model = plainToInstance(GenreEntity, updateEntityDto);

    return this.genresService.updateOne(conditions, model);
  }

  @Delete(':id')
  deleteOne(@Param() conditions: IdDto): Promise<GenreEntity> {
    return this.genresService.deleteOne(conditions);
  }
}
