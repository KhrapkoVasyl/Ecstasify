import { Errors } from '@/enums/error';
import { RootService } from '@/services';
import { RootStore } from './root.store';
import { Track } from '@/models/track';
import mockTracks from '../mocks/tracks.json';
import { makeAutoObservable } from 'mobx';
import { VolumeLevels } from '@/enums';

export class AudioPlayerStore {
  private rootStore: RootStore;
  private rootService: RootService;

  currentTrackIndex = 0;
  currentTrackDuration = 0;
  volume = VolumeLevels.Medium;

  playlist: Track[] = mockTracks as unknown as Track[];

  constructor(rootServise: RootService, rootStore: RootStore) {
    this.rootStore = rootStore;
    this.rootService = rootServise;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  setVolume(value: number) {
    this.volume = value;
  }

  get currentTrack() {
    return this.playlist[this.currentTrackIndex];
  }

  handleAudioError() {
    this.rootStore.errorHandler.handle(Errors.AudioLoadError, 'warning');
  }

  setPlaylist(tracks: Track[]) {
    this.playlist = mockTracks as unknown as Track[];
  }

  skipTrack(direction: 'next' | 'prev') {
    let index = 0;

    if (direction === 'prev') {
      index = this.currentTrackIndex - 1;

      if (index < 0) {
        index = this.playlist.length - 1;
      }
    } else {
      index = this.currentTrackIndex + 1;

      if (index >= this.playlist.length) {
        index = 0;
      }
    }

    this.currentTrackIndex = index;
  }

  goToNextTrack() {
    this.skipTrack('next');
  }

  goToPrevTrack() {
    this.skipTrack('prev');
  }
}
