import { RootService } from '@/services';
import { RootStore } from './root.store';
import { makeAutoObservable } from 'mobx';

export class HeaderStore {
  searchString = '';

  constructor(private rootService: RootService, private rootStore: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setSearchString(value: string) {
    this.searchString = value;
  }
}
