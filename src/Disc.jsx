import { useNavigate } from "react-router";
import DiscImage from "./assets/disc.svg";
export default function Disc(props) {
  const redirect = useNavigate();
  return (
    <div className="card" onClick={props.onClick}>
      <img src={DiscImage} alt="Disc-0" className="disc" />
      {props.showBackButton && <span onClick={() => redirect("/")}>🡐</span>}
      <img src={props.albumArt} alt="" className="albumArt" />
    </div>
  );
}
