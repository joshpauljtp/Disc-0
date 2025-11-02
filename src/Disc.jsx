import DiscImage from "./assets/disc.svg";
export default function Disc(props) {
  return (
    <div className="card" onClick={props.onClick}>
      <img src={DiscImage} alt="Disc-0" className="disc" />
      <img src={props.albumArt} alt="" className="albumArt" />
    </div>
  );
}
