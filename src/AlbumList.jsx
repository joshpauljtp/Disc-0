import { ALBUM_LIST } from "./constants";
import Disc from "./Disc";

export default function AlbumList({ setSelectedTrack }) {
  const onClick = (id) => {
    setSelectedTrack(id);
  };

  return (
    <>
      {ALBUM_LIST.map((album, index) => (
        <Disc
          albumArt={album.img}
          key={index}
          onClick={() => onClick(album.tracks[0].youtubeId)}
        />
      ))}
    </>
  );
}
