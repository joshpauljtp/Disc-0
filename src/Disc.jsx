import DiscImage from "./assets/disc.svg";
import { useRouter } from "./useRouter";
export default function Disc(props) {
  const { goBack } = useRouter();
  return (
    <div className="card" onClick={props.onClick}>
      <img src={DiscImage} alt="Disc-0" className="disc" />
      {props.showBackButton && <span onClick={goBack}>🡐</span>}
      <img src={props.albumArt} alt="" className="albumArt" />
    </div>
  );
}
