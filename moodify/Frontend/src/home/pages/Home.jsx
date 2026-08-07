import React from "react";
import Camera from "../../expression/components/Camera";
import Player from "../components/Player";
import "./style/homestyle.scss";

function Home() {
  return (
    <div className="home">
      <div className="home__camera">
        <Camera />
      </div>

      <div className="home__player">
        <Player />
      </div>
    </div>
  );
}

export default Home;