import albumThePolice from "./assets/albumThePolice.png";
import Disc from "./Disc";

export default function Player({
  togglePlay,
  isPlaying,
  duration,
  progress,
  handleSeek,
}) {
  const track = {
    img: albumThePolice,
    title: "Track TITLE",
    artist: "TEST ARTIST",
    year: "1999",
    noOfTracks: 5,
    tracks: [],
  };

  return (
    <div>
      <Disc albumArt={track.img} showBackButton />
      <h2>{track.title}</h2>
      <h3>{track.artist}</h3>

      <div className="flex gap-4 mt-3">
        <div className="w-full mt-3">
          <input
            type="range"
            min="0"
            max={duration}
            step="0.1"
            value={progress}
            onChange={handleSeek}
            className="w-full accent-blue-500 cursor-pointer"
          />
        </div>
        <button
          onClick={togglePlay}
          className="px-4 py-2 bg-blue-600 rounded text-white font-semibold"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button className="px-3 py-2 bg-gray-700 rounded">⏭</button>
      </div>
    </div>
  );
}
