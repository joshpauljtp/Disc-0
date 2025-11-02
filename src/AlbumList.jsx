import albumDaftPunk from "./assets/albumDaftPunk.png";
import albumThePolice from "./assets/albumThePolice.png";
import Disc from "./Disc";

export default function AlbumList({ setSelectedTrack }) {
  const albumList = [
    {
      img: albumThePolice,
      title: "TEST TITLE",
      artist: "TEST ARTIST",
      year: "1999",
      noOfTracks: 5,
      youtubeId: "sI_PQZvz5js",
    },
    {
      img: albumDaftPunk,
      title: "TEST TITLE",
      artist: "TEST ARTIST",
      year: "1999",
      noOfTracks: 5,
      youtubeId: "sI_PQZvz5js",
    },

    {
      img: albumThePolice,
      title: "TEST TITLE",
      artist: "TEST ARTIST",
      year: "1999",
      noOfTracks: 5,
      youtubeId: "sI_PQZvz5js",
    },
    {
      img: albumThePolice,
      title: "TEST TITLE",
      artist: "TEST ARTIST",
      year: "1999",
      noOfTracks: 5,
      youtubeId: "sI_PQZvz5js",
    },
    {
      img: albumThePolice,
      title: "TEST TITLE",
      artist: "TEST ARTIST",
      year: "1999",
      noOfTracks: 5,
      youtubeId: "sI_PQZvz5js",
    },
  ];

  const onClick = (id) => {
    console.log("clicked");
    setSelectedTrack(albumList[0].youtubeId);
  };

  return (
    <>
      {albumList.map((album, index) => (
        <Disc
          albumArt={album.img}
          key={index}
          onClick={() => onClick(album.youtubeId)}
        />
      ))}
    </>
  );
}
