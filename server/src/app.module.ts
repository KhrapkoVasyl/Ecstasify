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

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    FeaturesModule,
    AuthorsModule,
    GenresModule,
    PlaylistsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
