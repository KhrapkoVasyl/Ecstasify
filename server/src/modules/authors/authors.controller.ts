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
import { CreateAuthorDto, UpdateAuthorDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../auth/guards';

@ApiTags('authors')
@Controller('authors')
//@UseGuards(AccessTokenGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  findAll(@Query() query: any) {
    if (query.name) {
      return this.authorsService.findAll(query['name']);
    }

    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(id);
  }

  @Post()
  createOne(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.createOne(createAuthorDto);
  }

  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() updateEntityDto: UpdateAuthorDto) {
    return this.authorsService.updateOne(id, updateEntityDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.authorsService.deleteOne(id);
  }
}
