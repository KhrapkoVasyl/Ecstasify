import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

const MONGOOSE_URI = process.env.MONGOOSE_URI;
const MONGOOSE_DATABASE = process.env.MONGOOSE_DATABASE;

@Module({
  imports: [
    MongooseModule.forRoot(MONGOOSE_URI, {
      dbName: MONGOOSE_DATABASE,
    }),
  ],
  exports: [MongooseModule],
})
export class NoSqlDatabaseModule {}
