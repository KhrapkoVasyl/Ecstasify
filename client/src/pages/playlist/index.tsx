import React from 'react';
import PlaylistPageHeader from './components/playlist-page-header';

const PlaylistPage = () => {
  return (
    <div>
      <PlaylistPageHeader name="Liked Songs" totalTracks={255} cover={null} />
    </div>
  );
};

export default PlaylistPage;
