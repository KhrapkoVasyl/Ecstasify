import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config';
import { DatabaseModule, NoSqlDatabaseModule } from './systems/database';
import { FeaturesModule } from './modules/features';
import { TracksModule } from './modules/tracks';
import { AuthorsModule } from './modules/authors2';
import { GenresModule } from './modules/genres';
import { PlaylistsModule } from './modules/playlists';
import { UsersModule } from './modules/users';
import { AuthModule } from './modules/auth/auth.module';
import { SubscriptionPlansModule } from './modules/subscription-plans';
import { SubscriptionFeaturesModule } from './modules/subscription-features';
import { FilesModule } from './modules/files';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    NoSqlDatabaseModule,
    SubscriptionPlansModule,
    FeaturesModule,
    SubscriptionFeaturesModule,
    AuthorsModule,
    GenresModule,
    PlaylistsModule,
    UsersModule,
    AuthModule,
    TracksModule,
    //FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
