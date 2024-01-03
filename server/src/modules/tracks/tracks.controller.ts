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
import { TracksService } from './tracks.service';
import { TrackEntity } from './track.entity';
import { IdDto } from 'src/common/dto';
import { CreateTrackDto, UpdateTrackDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { AccessTokenGuard } from '../auth/guards';

@ApiTags('tracks')
@Controller('tracks')
@UseGuards(AccessTokenGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  findAll(): Promise<TrackEntity[]> {
    return this.tracksService.findAll({
      relations: { genre: true },
    });
  }

  @Get(':id')
  findOne(@Param() conditions: IdDto): Promise<TrackEntity> {
    return this.tracksService.findOne(conditions, {
      relations: { genre: true },
    });
  }

  @Post()
  createOne(@Body() createEntityDto: CreateTrackDto): Promise<TrackEntity> {
    const model = plainToInstance(TrackEntity, createEntityDto);

    return this.tracksService.createOne(model);
  }

  @Patch(':id')
  updateOne(
    @Param() conditions: IdDto,
    @Body() updateEntityDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    const model = plainToInstance(TrackEntity, updateEntityDto);

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
