import { Typography } from "@material-ui/core";
import { LinearProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import { url_base } from "../../../api/env";
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
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  function getPelisPaged() {
    axios
      .get(url_base + `peli/${encodeURI(header)}/${page}`)
      .then((response) => {
        const data = response.data;
        if (!response.data) return;
        setMyVideos((prev) =>
          page === 1 ? data.videos : prev.concat(data.videos)
        );
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(page < video.pages);
  }

  useEffect(() => {
    if (showMore) {
      getPelisPaged();
    } else {
      setMyVideos(video.videos.slice(0, 6));
      setPage(1);
    }
  }, [showMore, page]);

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

      <InfiniteScroll
        dataLength={myVideos.length}
        hasMore={showMore & isLoading}
        next={() => setPage((prev) => prev + 1)}
        loader={<LinearProgress />}
      >
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
        <></>
      </InfiniteScroll>
      <ShowMore
        cantidad={video.countVideos}
        callbackShow={(e) => setShowMore(e)}
      />
    </div>
  );
};

export default CardContainer;
