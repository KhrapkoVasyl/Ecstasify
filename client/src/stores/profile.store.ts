import { User } from '@/models/user';
import { RootService } from '@/services';
import { RootStore } from './root.store';
import { makeAutoObservable } from 'mobx';
import { UserRole } from '@/enums/user-role';

export class ProfileStore {
  private rootStore: RootStore;
  private rootService: RootService;

  currentUser: User | null = null;
  getCurrentUserLoading = false;

  constructor(rootService: RootService, rootStore: RootStore) {
    this.rootStore = rootStore;
    this.rootService = rootService;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  get isAdmin() {
    return this.currentUser?.role === UserRole.Admin;
  }

  setCurrentUser(user: typeof this.currentUser) {
    this.currentUser = user;
  }

  async getCurrentUser() {
    this.getCurrentUserLoading = true;
    const user = await this.rootService.usersService.getProfile();

    if (user) {
      this.setCurrentUser({ ...user, role: UserRole.Admin });
    }
    this.getCurrentUserLoading = false;
  }
}
