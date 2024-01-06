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
import { IdDto } from 'src/common/dto';
import { FileMimetypeValidationPipe } from 'src/common/pipes';
import { imagesMimetypes } from 'src/common/constants';

@ApiTags('authors')
@Controller('authors')
//@UseGuards(AccessTokenGuard)
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthorsController {
  constructor(
    private readonly authorsService: AuthorsService, // private readonly dbFilesService: DbFilesService,
  ) {}

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
  createOne(
    @Body(new FileMimetypeValidationPipe(imagesMimetypes))
    createAuthorDto: CreateAuthorDto,
  ) {
    const { file, ...dto } = createAuthorDto;
    const { data, filename: fileName, mimetype } = file;

    return this.authorsService.createOne(dto, { data, fileName, mimetype });
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
