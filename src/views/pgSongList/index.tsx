import React, {
  useMemo,
  useCallback,
  useEffect,
  useState,
  Children
} from "react";
import { Loading, Banner, Card, Meta, Tittle, SubHeader } from "@/components";
import { useHistory } from "react-router-dom";
import "./index.scss";

export interface IPSongListItem {
  num?:string | number;
  songName?:string;
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
const PageSongList: React.FC = function() {
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
            {[1, 2, 3, 4, 5].map((item, index) => {
              return <SongListItem num={index+1} />;
            })}
            <SongListItem />
            <SongListItem />
            <SongListItem />
            <SongListItem />
            <SongListItem />
            <SongListItem />
            <SongListItem />
          </div>
        </div>
      </div>
    </>
  );
};

export default PageSongList;
