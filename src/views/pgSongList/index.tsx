import React, { useMemo, useCallback, useEffect } from "react";
import {
  Loading,
  LoadingContainer,
  Card,
  Meta,
  Tittle,
  SubHeader
} from "@/components";
import { scrollFixed } from "@/untils/imageLazy";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import Scroll from "@/components/scroll/index";

import { getSongList } from "./store/";

import "./index.scss";

export interface IPSongListItem {
  num?: string | number;
  songName?: string;
  songDesc?: string;
  onClick?: React.MouseEventHandler;
}
const SongListItem: React.FC<IPSongListItem> = function({
  num = "1",
  songName = "冯博",
  songDesc = "这是一个非常nice的人",
  onClick
}) {
  return (
    <div className="song-list-item" onClick={onClick}>
      <span>{num}</span>
      <div className="song-name-desc">
        <span className="song-name">{songName}</span>
        <span className="song-desc">{songDesc}</span>
      </div>
    </div>
  );
};
export interface IPPalyAllButton {
  playNums?: string | number;
  onClick?: React.MouseEventHandler;
  songNums?: string | number;
}
const PalyAllButton: React.FC<IPPalyAllButton> = function({
  playNums = "123",
  onClick,
  songNums
}) {
  return (
    <div className="song-play-button">
      <div className="list-play-all" onClick={onClick}>
        <i className={`iconfont icon-bofang`}> </i>
        &nbsp; &nbsp;
        <span>播放全部</span>
        <span>(共{songNums}首)</span>
      </div>
      <button>+收藏({playNums})</button>
    </div>
  );
};
const PageSongList: React.FC = function() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const songList = useSelector((state: any) => state.songList.songList);
  const description = useSelector((state: any) => state.songList.description);
  const isloading = useSelector((state: any) => state.songList.isloading);
  const history = useHistory();

  useEffect(() => {
    // sub-header-title
    let header = document.querySelector(".songlist-wrapper .sub-header");
    let headerTitle = document.querySelector(
      ".songlist-wrapper .sub-header-title"
    );

    scrollFixed(
      ".song-play-button",
      ".songlist-wrapper",
      ".fixed-flag",
      flag => {
        if (flag) {
          header?.classList.remove("head-white-temp");
          headerTitle?.classList.remove("sub-header-title-temp");
        } else {
          header?.classList.add("head-white-temp");
          headerTitle?.classList.add("sub-header-title-temp");
        }
      }
    );
    if (id) {
      dispatch(getSongList(id));
    }

    return () => {};
  }, [dispatch, id]);

  const handleGoBack = useCallback(
    e => {
      history.go(-1);
    },
    [history]
  );
  return (
    <>
      {isloading && (
        <LoadingContainer>
          <Loading isLoading={isloading} size="big" />
        </LoadingContainer>
      )}
      <div className="songlist-wrapper">
        <SubHeader title={description.name} onClick={handleGoBack} />
        <div className="song-list-content">
          <div className="song-list-desc">
            <div
              className="bacground"
              style={{ background: `url(${description.coverImgUrl})` }}
            >
              <div className="filter"></div>
            </div>
            <div className="song-desc-center">
              <Card imageUrl={description.coverImgUrl} width="36" />
              <div className="song-detail">
                <Tittle title={description.description} />
                <div className="author">
                  <img src={description.avatarUrl} alt="author" />
                  <span>{description.nickname}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="song-list">
            <div className="fixed-flag"></div>
            <PalyAllButton
              playNums={description.subscribedCount}
              songNums={songList.length}
            />
            {songList.map((item: any, index: number) => {
              return (
                <SongListItem
                  num={index + 1}
                  songName={item.name}
                  songDesc={item.ar[0].name}
                  key={index + item.name}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PageSongList;
