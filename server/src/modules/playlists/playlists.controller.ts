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
import { PlaylistsService } from './playlists.service';
import { PlaylistEntity } from './playlist.entity';
import { IdDto } from 'src/common/dto';
import { AddTrackDto, CreatePlaylistDto, UpdatePlaylistDto } from './dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { AccessTokenGuard } from '../auth/guards';

@ApiTags('playlists')
@Controller('playlists')
@UseGuards(AccessTokenGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Get()
  findAll(): Promise<PlaylistEntity[]> {
    return this.playlistsService.findAll();
  }

  @Get(':id')
  findOne(@Param() conditions: IdDto): Promise<PlaylistEntity> {
    return this.playlistsService.findOne(conditions);
  }

  @Post()
  createOne(
    @Body() createEntityDto: CreatePlaylistDto,
  ): Promise<PlaylistEntity> {
    const model = plainToInstance(PlaylistEntity, createEntityDto);

    return this.playlistsService.createOne(model);
  }

  @Patch(':id')
  updateOne(
    @Param() conditions: IdDto,
    @Body() updateEntityDto: UpdatePlaylistDto,
  ): Promise<PlaylistEntity> {
    const model = plainToInstance(PlaylistEntity, updateEntityDto);

    return this.playlistsService.updateOne(conditions, model);
  }

  @Delete(':id')
  deleteOne(@Param() conditions: IdDto): Promise<PlaylistEntity> {
    return this.playlistsService.deleteOne(conditions);
  }

  @Post('tracks/:id')
  @ApiParam({ name: 'id', description: 'Playlist id' })
  addTrackToPlaylist(
    @Param() playlist: IdDto,
    @Body() addTrackDto: AddTrackDto,
  ): Promise<PlaylistEntity> {
    return this.playlistsService.addTrackToPlaylist(
      { id: playlist.id },
      { id: addTrackDto.trackId },
    );
  }
}
