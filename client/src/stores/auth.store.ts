import { RootService } from '@/services';
import { SignInRequest, SignUpRequest } from '@/services/users.service';
import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from './root.store';
import { makePersistable } from 'mobx-persist-store';

type Auth = {
  refreshToken: string;
  accessToken: string;
};

export class AuthStore {
  private rootStore: RootStore;
  private rootService: RootService;

  auth: Auth | null = null;

  signUpLoading = false;
  signInLoading = false;
  signOutLoading = false;

  constructor(rootService: RootService, rootStore: RootStore) {
    this.rootStore = rootStore;
    this.rootService = rootService;

    makeAutoObservable(this, {}, { autoBind: true });

    makePersistable(this, {
      name: 'AuthStore',
      properties: ['auth'],
      storage: window.localStorage,
    });
  }

  get isAuthenticated() {
    return (
      Boolean(this.auth?.accessToken) &&
      Boolean(this.rootStore.profileStore.currentUser)
    );
  }

  setAuth(auth: typeof this.auth) {
    this.auth = auth;
  }

  async signUp(data: SignUpRequest) {
    runInAction(() => {
      this.signUpLoading = true;
    });

    const { signUp } = this.rootService.usersService;
    const res = await signUp(data);

    if (res) {
      this.setAuth({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
      });
    }

    runInAction(() => {
      this.signUpLoading = false;
    });
  }

  async signIn(data: SignInRequest) {
    runInAction(() => {
      this.signInLoading = true;
    });

    const { signIn } = this.rootService.usersService;
    const res = await signIn(data);

    if (res) {
      this.setAuth({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
      });
    }

    runInAction(() => {
      this.signInLoading = false;
    });
  }

  async signOut() {
    this.setAuth(null);
    const { setCurrentUser } = this.rootStore.profileStore;
    setCurrentUser(null);
  }

  async refreshAuth() {
    const { refreshAuth } = this.rootService.usersService;
    const res = await refreshAuth();

    if (res) {
      this.setAuth({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
      });

      return res.accessToken;
    } else {
      this.signOut();
    }
  }
}
