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
import { AuthorsService } from './authors.service';
import {
  CreateAuthorDto,
  FindAllAuthorOptionsDto,
  UpdateAuthorDto,
} from './dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../auth/guards';
import { IdDto } from 'src/common/dto';

@ApiTags('authors')
@Controller('authors')
@UseGuards(AccessTokenGuard)
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  findAll(@Query() options: FindAllAuthorOptionsDto) {
    return this.authorsService.findAll(options);
  }

  @Get(':id')
  findOne(@Param() conditions: IdDto) {
    return this.authorsService.findOne(conditions);
  }

  @Post()
  @ApiBody({ type: CreateAuthorDto })
  @ApiConsumes('multipart/form-data')
  createOne(@Body() createAuthorDto: CreateAuthorDto) {
    const { file, ...dto } = createAuthorDto;
    return this.authorsService.createOne(createAuthorDto);
  }

  @Patch(':id')
  updateOne(
    @Param() conditions: IdDto,
    @Body() updateEntityDto: UpdateAuthorDto,
  ) {
    return this.authorsService.updateOne(conditions, updateEntityDto);
  }

  @Delete(':id')
  deleteOne(@Param() conditions: IdDto) {
    return this.authorsService.deleteOne(conditions);
  }
}
