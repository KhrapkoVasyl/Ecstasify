import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TrackEntity } from './track.entity';
import { IdDto } from 'src/common/dto';
import { CreateTrackDto, FindAllTracksOptionsDto, UpdateTrackDto } from './dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { AccessTokenGuard } from '../auth/guards';
import { FileMimetypeValidationPipe } from 'src/common/pipes';
import { imagesMimetypes } from 'src/common/constants';

@ApiTags('tracks')
@Controller('tracks')
@UseGuards(AccessTokenGuard)
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  findAll(
    @Query() { searchName }: FindAllTracksOptionsDto,
  ): Promise<TrackEntity[]> {
    return this.tracksService.findAll({
      relations: { genre: true },
      where: { name: searchName },
    });
  }

  @Get(':id')
  findOne(@Param() conditions: IdDto): Promise<TrackEntity> {
    return this.tracksService.findOne(conditions, {
      relations: { genre: true },
    });
  }

  @Post()
  @ApiBody({ type: CreateTrackDto })
  @ApiConsumes('multipart/form-data')
  createOne(
    @Body(new FileMimetypeValidationPipe(imagesMimetypes))
    createEntityDto: CreateTrackDto,
  ): Promise<TrackEntity> {
    const { file, genreId, ...dto } = createEntityDto;
    const model = plainToInstance(TrackEntity, {
      ...dto,
      genre: { id: genreId },
    });

    return this.tracksService.createOne(model, file);
  }

  @Patch(':id')
  updateOne(
    @Param() conditions: IdDto,
    @Body() updateEntityDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    const { genreId } = updateEntityDto;
    const model = plainToInstance(TrackEntity, {
      ...updateEntityDto,
      genre: { id: genreId },
    });

    return this.tracksService.updateOne(conditions, model);
  }

  @Delete(':id')
  deleteOne(@Param() conditions: IdDto): Promise<TrackEntity> {
    return this.tracksService.deleteOne(conditions);
  }

  @Get('playlists/:id')
  getAllTracksFromPlaylist(@Param() playlist: IdDto): Promise<TrackEntity[]> {
    return this.tracksService.findAll({
      where: { playlists: { id: playlist.id } },
      relations: { genre: true },
    });
  }
}
