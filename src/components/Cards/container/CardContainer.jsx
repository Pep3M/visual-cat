import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  globalsColors,
  neumorphismDivContainer,
} from "../../../styles/GlobalStyles";
import ShowMore from "../atoms/ShowMore/ShowMore";
import ItemCard from "../molecules/ItemCard/ItemCard";

const CardContainer = (props) => {
  const { header, video } = props;
  const [showMore, setShowMore] = useState(false);

  const [myVideos, setMyVideos] = useState(video.videos.slice(0, 6));

  useEffect(() => {
    if (showMore) {
      let arr = myVideos;
      let i = 0;
      for (i = 12; i < video.videos.length; i += 6) {
        arr = arr.concat(video.videos.slice(i - 6, i));
      }
      if (i > video.videos.length) {
        arr = arr.concat(video.videos.slice(arr.length, video.videos.length));
      }
      setMyVideos(video.videos);
    } else {
      setMyVideos(video.videos.slice(0, 6));
    }
    return;
  }, [showMore]);

  return (
    <div
      style={{
        ...neumorphismDivContainer,
        margin: 20,
        marginBottom: 0,
        padding: 10,
      }}
    >
      <Typography
        variant="h4"
        style={{
          width: "100%",
          textAlign: "center",
          marginBlock: 30,
          color: globalsColors.primary,
        }}
      >
        {header}
      </Typography>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {myVideos.map((item, key) => (
          <ItemCard
            key={key}
            title={item.Nombre}
            data={item}
            img={item.Imagen}
          />
        ))}
      </div>
      <ShowMore
        cantidad={video.videos.length}
        callbackShow={(e) => setShowMore(e)}
      />
    </div>
  );
};

export default CardContainer;
