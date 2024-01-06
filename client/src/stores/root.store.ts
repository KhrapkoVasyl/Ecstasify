import { RootService } from '@/services';
import { ErrorHandler } from '@/lib/error-handler';
import { AudioPlayerStore } from './audio-player.store';
import { AuthStore } from './auth.store';
import { AuthorsStore } from './authors.store';
import { ProfileStore } from './profile.store';
import { SubscriptionsStore } from './subscriptions.store';
import { TracksStore } from './tracks.store';
import { UsersStore } from './users.store';
import { HeaderStore } from './header.store';

export class RootStore {
  private rootService = new RootService(this);

  errorHandler = new ErrorHandler();
  usersStore = new UsersStore(this.rootService, this);
  authorsStore = new AuthorsStore(this.rootService, this);
  tracksStore = new TracksStore(this.rootService, this);
  audioPlayerStore = new AudioPlayerStore(this.rootService, this);
  authStore = new AuthStore(this.rootService, this);
  profileStore = new ProfileStore(this.rootService, this);
  subscriptionsStore = new SubscriptionsStore(this.rootService, this);
  headerStore = new HeaderStore(this.rootService, this);
}

export const store = new RootStore();
