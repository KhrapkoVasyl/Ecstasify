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
import { FeaturesService } from './features.service';
import { FeatureEntity } from './feature.entity';
import { IdDto } from 'src/common/dto';
import { CreateFeatureDto, UpdateFeatureDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { AccessTokenGuard } from '../auth/guards';

@ApiTags('features')
@Controller('features')
@UseGuards(AccessTokenGuard)
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Get()
  findAll(): Promise<FeatureEntity[]> {
    return this.featuresService.findAll();
  }

  @Get(':id')
  findOne(@Param() conditions: IdDto): Promise<FeatureEntity> {
    return this.featuresService.findOne(conditions);
  }

  @Post()
  createOne(@Body() createEntityDto: CreateFeatureDto): Promise<FeatureEntity> {
    const model = plainToInstance(FeatureEntity, createEntityDto);

    return this.featuresService.createOne(model);
  }

  @Patch(':id')
  updateOne(
    @Param() conditions: IdDto,
    @Body() updateEntityDto: UpdateFeatureDto,
  ) {
    const model = plainToInstance(FeatureEntity, updateEntityDto);

    return this.featuresService.updateOne(conditions, model);
  }

  @Delete(':id')
  deleteOne(@Param() conditions: IdDto) {
    return this.featuresService.deleteOne(conditions);
  }
}
