import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

export default function PlayerControls({
  duration,
  progress,
  handleSeek,
  togglePlay,
  isPlaying,
}) {
  return (
    <>
      <div className="buttons">
        <button onClick={togglePlay} className="playButton">
          <i className={`fa fa-${isPlaying ? "pause" : "play"}`} />
        </button>
      </div>
      <RangeSlider
        className="progressBar"
        type="range"
        min={0}
        max={duration}
        step="0.1"
        defaultValue={[0, 0]}
        value={[0, progress]}
        rangeSlideDisabled={true}
        thumbsDisabled={[true, false]}
        onInput={(e) => {
          handleSeek(e[1]);
        }}
      />
    </>
  );
}
