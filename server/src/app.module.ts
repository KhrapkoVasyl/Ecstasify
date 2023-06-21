import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config';
import { DatabaseModule } from './systems/database';
import { FeaturesModule } from './modules/features';
import { AuthorsModule } from './modules/authors';
import { GenresModule } from './modules/genres';
import { PlaylistsModule } from './modules/playlists';
import { UsersModule } from './modules/users';
import { SubscriptionPlansModule } from './modules/subscription-plans';
import { SubscriptionFeaturesModule } from './modules/subscription-features';
import { FilesModule } from './modules/files';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    SubscriptionPlansModule,
    FeaturesModule,
    SubscriptionFeaturesModule,
    AuthorsModule,
    GenresModule,
    PlaylistsModule,
    UsersModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
