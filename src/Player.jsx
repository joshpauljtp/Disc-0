import { useMemo } from "react";
import { ALBUM_LIST } from "./constants";
import Disc from "./Disc";
import PlayerControls from "./PlayerControls";
import { useRouter } from "./useRouter";

export default function Player({ albumIndex, setSelected, ...rest }) {
  const { navigate, path } = useRouter();

  const album = useMemo(() => {
    const index = albumIndex || window.location.pathname.split("/")[2];
    return ALBUM_LIST[index];
  }, [albumIndex, path]);

  const onSelectTrack = (trackIndex) => {
    const index = albumIndex || window.location.pathname.split("/")[2];
    const youtubeId = album.tracks[trackIndex].youtubeId;
    navigate(`/album/${index}/track/${youtubeId}`);
    setSelected((prev) => ({
      ...prev,
      track: youtubeId,
    }));
  };

  const selectedTrack = useMemo(() => {
    if (!path.includes("track")) return null;
    const trackIndex = path.split("/").pop();
    return trackIndex;
  }, [path, window.location.pathname]);

  return (
    <div className="player">
      <Disc albumArt={album.img} showBackButton />
      <div className="details">
        <div className="mainDetails">
          <h2>{album.title}</h2>
          <h3>{album.artist}</h3>
          <h4>
            {album.year} • {album?.tracks?.length} tracks
          </h4>
        </div>

        <div>
          {album?.tracks.map((track, index) => (
            <div
              key={index}
              className="track"
              onClick={() => onSelectTrack(index)}
            >
              <div>
                <p>{track.title}</p>
                <h5>{track.duration}</h5>
              </div>
              {selectedTrack === track.youtubeId && (
                <PlayerControls {...rest} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
