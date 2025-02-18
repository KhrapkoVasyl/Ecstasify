import { RootService } from '@/services';
import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from './root.store';
import { Track } from '@/models/track';
import { sortByCreatedDate } from '@/helpers';
import { Genre } from '@/models/genre';

export class TracksStore {
  private rootStore?: RootStore;
  private rootService: RootService;

  // data
  tracks: Track[] = [];
  currentTrack: Track | null = null;
  genres: Genre[] = [];

  // loading states
  createTrackLoading = false;
  getAllTracksLoading = false;

  constructor(rootServise: RootService, rootStore?: RootStore) {
    this.rootStore = rootStore;
    this.rootService = rootServise;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getAllGenres() {
    const genres = await this.rootService.tracksService.getAllGenres();

    if (genres) {
      runInAction(() => {
        this.genres = genres;
      });
    }
  }

  async getAllTracks(name?: string) {
    runInAction(() => {
      this.getAllTracksLoading = true;
    });

    const { getAllTracks } = this.rootService.tracksService;
    const data = await getAllTracks({ name });

    if (data) {
      runInAction(() => {
        this.tracks = sortByCreatedDate(data);
      });
    }

    runInAction(() => {
      this.getAllTracksLoading = false;
    });
  }

  async createTrack(track: Partial<Track>) {
    runInAction(() => {
      this.createTrackLoading = true;
    });

    const { createTrack } = this.rootService.tracksService;
    await createTrack(track);
    this.getAllTracks();

    runInAction(() => {
      this.createTrackLoading = false;
    });
  }

  async deleteTrack(user: Track) {
    runInAction(() => {
      this.createTrackLoading = true;
    });

    const { deleteTrack } = this.rootService.tracksService;
    const { id: trackId } = user;
    await deleteTrack(trackId);
    this.getAllTracks();

    runInAction(() => {
      this.createTrackLoading = false;
    });
  }

  async updateTrack(trackId: Track['id'], updatedTrackData: Partial<Track>) {
    runInAction(() => {
      this.createTrackLoading = true;
    });

    const { updateTrack } = this.rootService.tracksService;
    await updateTrack(trackId, updatedTrackData);
    this.getAllTracks();

    runInAction(() => {
      this.createTrackLoading = false;
    });
  }

  resetTracks() {
    this.tracks = [];
  }

  resetCurrentTrack() {
    this.currentTrack = null;
  }

  setCurrentTrack(track: Track) {
    this.currentTrack = track;
  }
}
