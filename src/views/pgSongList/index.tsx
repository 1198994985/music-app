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
            <Card imageUrl="https://p2.music.126.net/7OiIpH11Ze8yni2oGMYnpA==/109951164653671933.jpg">
              <Meta title=" 123123213" />
            </Card>
            <Card imageUrl="https://p2.music.126.net/7OiIpH11Ze8yni2oGMYnpA==/109951164653671933.jpg">
              <Meta title=" 123123213" />
            </Card>
            <Card imageUrl="https://p2.music.126.net/7OiIpH11Ze8yni2oGMYnpA==/109951164653671933.jpg">
              <Meta title=" 123123213" />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageSongList;
