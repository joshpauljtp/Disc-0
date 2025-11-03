import { useEffect, useMemo } from "react";
import { ALBUM_LIST } from "./constants";
import Disc from "./Disc";
import PlayerControls from "./PlayerControls";

export default function Player({ albumIndex, selected, setSelected, ...rest }) {
  const album = useMemo(() => {
    const index = albumIndex || window.location.pathname.split("/")[2];
    return ALBUM_LIST[index];
  }, [albumIndex]);

  const onSelectTrack = (trackIndex) => {
    const youtubeId = album.tracks[trackIndex].youtubeId;
    setSelected((prev) => ({
      ...prev,
      track: youtubeId,
    }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onMainPlayClick = () => {
    if (
      !selected.track ||
      !album.tracks.some((t) => t.youtubeId === selected.track)
    )
      onSelectTrack(0);
    rest.togglePlay();
  };

  return (
    <div className="player">
      <Disc albumArt={album.img} showBackButton />
      <div className="details">
        <div className="mainDetails">
          <div>
            <h2>{album.title} </h2>
            <h3>{album.artist}</h3>
            <h4>
              {album.year} • {album?.tracks?.length} tracks
            </h4>
          </div>
          <button onClick={onMainPlayClick} className="playButton">
            <i className={`fa fa-${rest.isPlaying ? "pause" : "play"}`} />
          </button>
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
              {selected.track === track.youtubeId && (
                <PlayerControls {...rest} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
