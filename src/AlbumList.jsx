import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { ALBUM_LIST } from "./constants";
import Disc from "./Disc";

export default function AlbumList({ onSelectAlbum }) {
  gsap.registerPlugin(useGSAP, ScrollTrigger);

  const container = useRef();

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray(".card");
      boxes.forEach((box) => {
        gsap.to(box, {
          scale: 0.5,
          opacity: 0.5,
          transformOrigin: "bottom center",
          scrollTrigger: {
            trigger: box,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      {ALBUM_LIST.map((album, index) => (
        <Disc
          albumArt={album.img}
          key={index}
          onClick={() => onSelectAlbum(index)}
        />
      ))}
    </div>
  );
}
