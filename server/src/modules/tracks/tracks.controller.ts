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
import { TracksService } from './tracks.service';
import { TrackEntity } from './track.entity';
import { IdDto } from 'src/common/dto';
import { CreateTrackDto, UpdateTrackDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

@ApiTags('tracks')
@Controller('tracks')
@UseInterceptors(ClassSerializerInterceptor)
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  findAll(): Promise<TrackEntity[]> {
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param() conditions: IdDto): Promise<TrackEntity> {
    return this.tracksService.findOne(conditions);
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
  ) {
    const model = plainToInstance(TrackEntity, updateEntityDto);

    return this.tracksService.updateOne(conditions, model);
  }

  @Delete(':id')
  deleteOne(@Param() conditions: IdDto) {
    return this.tracksService.deleteOne(conditions);
  }
}
