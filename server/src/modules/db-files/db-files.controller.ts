import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { CreateFileDto } from '../files/dto';
import { DbFilesService } from './db-files.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { IdDto } from 'src/common/dto';

@ApiTags('db-files')
@Controller('db-files')
export class DbFilesController {
  constructor(private readonly dbFilesService: DbFilesService) {}

  @Post()
  @ApiBody({ type: CreateFileDto })
  @ApiConsumes('multipart/form-data')
  create(@UploadedFile() file: CreateFileDto) {
    console.log(file);
    return this.dbFilesService.saveFileToDB(file);
  }

  @Get()
  findAll() {
    return this.dbFilesService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: IdDto) {
    return this.dbFilesService.deleteOne(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: IdDto) {
    return this.dbFilesService.findOne(id);
  }
}
