import { Track } from '@/models/track';
import BaseService from './base.service';
import { Genre } from '@/models/genre';

class TracksService extends BaseService {
  getAllTracks = (query: { name?: string }) => {
    return this.httpRequest.get<Track[]>('/tracks', true, query);
  };

  createTrack = (data: Partial<Track>) => {
    const formData = new FormData();
    for (const key in data) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      formData.append(key, data[key]);
    }

    return this.httpRequest.post<Track>('/tracks', formData, true, undefined, {
      contentType: 'multipart/form-data',
    });
  };

  updateTrack = (trackId: Track['id'], data: Partial<Track>) => {
    return this.httpRequest.patch<Track>(`/tracks/${trackId}`, data);
  };

  deleteTrack = (trackId: string) => {
    return this.httpRequest.delete<Track>(`/tracks/${trackId}`);
  };

  getAllGenres = () => {
    return this.httpRequest.get<Genre[]>('/genres');
  };
}

export default TracksService;
