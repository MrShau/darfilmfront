import React from "react";
import { Container } from "react-bootstrap";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import Chat from "../../components/Chat/Chat";
import { useState } from "react";
import FilmApi from "../../api/FilmApi";

const Watch = (props) => {

  const [video, setVideo] = useState(null);
  const queryParams = new URLSearchParams(window.location.search);
  const roomId = queryParams.get('roomId');

  if (video == null) {
    const filmId = Number(queryParams.get('id') ?? 1);
    setVideo({})
    FilmApi.getFilm(filmId)
      .then(res => setVideo(res))
    
  }

  return (
    <>
      <div className="mx-2 my-0 my-md-3 p-0 p-md-2 shadow-lg">
        <h3 className="my-2">{video?.filmName}</h3>
        <VideoPlayer
          src={video?.filmSrc}
          roomId={roomId}
        />

        <Chat roomId={roomId}/>

      </div>
    </>
  )

}

export default Watch