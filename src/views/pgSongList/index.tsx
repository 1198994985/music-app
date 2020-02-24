import React, {
  useMemo,
  useCallback,
  useEffect,
  useState,
  Children
} from "react";
import { Loading, Banner, Card, Meta, Tittle, SubHeader } from "@/components";
import { useHistory } from "react-router-dom";
import { scrollFixed } from "@/untils/imageLazy";

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
}
const PalyAllButton: React.FC<IPPalyAllButton> = function({
  playNums = "123",
  onClick
}) {
  return (
    <div className="song-play-button">
      <div className="list-play-all" onClick={onClick}>
        <i className={`iconfont icon-bofang`}> </i>
        &nbsp; &nbsp;
        <span>播放全部</span>
      </div>
      <button>+收藏({playNums})</button>
    </div>
  );
};
const PageSongList: React.FC = function() {
  useEffect(() => {
    scrollFixed(".song-play-button", ".songlist-wrapper", ".fixed-flag");
    return () => {};
  }, []);
  console.log("123123123");
  return (
    <>
      <div className="songlist-wrapper">
        <SubHeader title="歌曲列表" />
        <div className="song-list-content">
          <div className="song-list-desc">
            <div className="bacground">
              <div className="filter"></div>
            </div>
            <div className="song-desc-center">
              <Card
                imageUrl="https://p2.music.126.net/7OiIpH11Ze8yni2oGMYnpA==/109951164653671933.jpg"
                width="36"
              />
              <div className="song-detail">
                <Tittle title="100首好听到单曲循环的歌 | 精选持更" />
              </div>
            </div>
          </div>
          <div className="song-list">
            <div className="fixed-flag"></div>
            <PalyAllButton />
            {Array.from({length:100}).map((item, index) => {
              return <SongListItem num={index + 1} />;
            })}
            
          </div>
        </div>
      </div>
    </>
  );
};

export default PageSongList;
