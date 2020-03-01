import React, { useMemo, useRef, useEffect, useState } from "react";
import {
  changePlayingState,
  changeShowPlayList,
  changeFullScreen,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayList,
  changePlayMode,
  getSongLyric
} from "./store/actionCreators";
import { getSongUrl } from "./store/service";
import { SubHeader } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { formatPlayTime, playMode } from "@/untils/config";
import Process from "./component/process";
import "./index.scss";

export interface IPminiplayer {
  isPlay?: boolean;
  handleFullScreen?: (flag: boolean) => void;
  handlePlaying?: () => void;
  currentSong?: any;
}
const MiNIPlayer: React.FC<IPminiplayer> = function({
  isPlay = false,
  handleFullScreen,
  handlePlaying,
  currentSong
}) {
  return (
    <div className="player-small">
      <div className="player-song-img">
        <div
          className="player-img-wrapper"
          onClick={() => {
            handleFullScreen && handleFullScreen(true);
          }}
        >
          <img
            src={
              currentSong &&
              currentSong.al &&
              currentSong.al.picUrl + "?param=200x200"
            }
            alt=""
          />
          <div className="song-name-desc">
            <span className="song-name">{currentSong && currentSong.name}</span>
            <span className="song-desc">{}</span>
          </div>
        </div>
        <div className="mini-player-button">
          <i
            className={`iconfont  ${
              isPlay ? " icon-zanting_huaban" : " icon-bofangsanjiaoxing"
            }`}
            onClick={() => {
              handlePlaying && handlePlaying();
            }}
          ></i>

          <i className="iconfont icon-PlayListbofangliebiao"></i>
        </div>
      </div>
    </div>
  );
};
export interface IPNoramlPlayer {
  isPlay?: boolean;
  handleFullScreen?: (flag: boolean) => void;
  handlePlaying?: () => void;
  percent?: number;
  onProgressChange: (percent: number) => void;
  currentTime: string | number;
  duration: string | number;
  handlePrev?: () => void;
  handleNext?: () => void;
  currentSong?: any;
}
const NoramlPlayer: React.FC<IPNoramlPlayer> = function({
  isPlay = false,
  handleFullScreen,
  handlePlaying,
  percent,
  onProgressChange,
  currentTime,
  duration,
  handlePrev,
  handleNext,
  currentSong
}) {
  const getplayMode = (num: number | string) => {
    if (num == playMode.loop) {
      return <i className="iconfont icon-icon-"></i>;
    } else if (num == playMode.random) {
      return <i className="iconfont icon-suijibofang01"></i>;
    } else if (num == playMode.sequence) {
      return <i className="iconfont icon-icon-1"></i>;
    }
  };
  return (
    <div className="player-wrapper">
      <div className="player-wrap-mask"> </div>
      <SubHeader
        title={currentSong && currentSong.name}
        onClick={() => {
          handleFullScreen && handleFullScreen(false);
        }}
      />
      <div className="player-song-img">
        <div className="music-logo">
          <img
            src={
              currentSong &&
              currentSong.al &&
              currentSong.al.picUrl + "?param=400x400"
            }
            alt=""
            style={{
              animation: "imgRotate 40s linear infinite"
            }}
          />
        </div>
      </div>
      <div className="player-progress">
        <span> {formatPlayTime(currentTime)}</span>
        <Process percentChange={onProgressChange} percent={percent} />
        <span> {formatPlayTime(duration)}</span>
      </div>

      <footer className="player-footer">
        <div className="play-footer-button">
          {getplayMode(1)}
          <i
            className="iconfont icon-shangyiqu101"
            onClick={() => {
              handlePrev && handlePrev();
            }}
          ></i>
          <i
            className={
              isPlay ? "iconfont icon-zanting" : "iconfont icon-bofang"
            }
            onClick={() => {
              handlePlaying && handlePlaying();
            }}
          ></i>
          <i
            className="iconfont icon-xiayiqu101"
            onClick={() => {
              handleNext && handleNext();
            }}
          ></i>
          <i className="iconfont icon-PlayListbofangliebiao"></i>
        </div>
      </footer>
    </div>
  );
};
export interface Iplayer {
  isPlay?: boolean;
  isDisplay?: boolean;
}
const PgPlayer: React.FC<Iplayer> = function() {
  const {
    playing,
    fullScreen,
    currentSong,
    playList,
    currentIndex
  } = useSelector((state: any) => state.player);

  const dispatch = useDispatch();
  const audioRef = useRef<any>();
  //目前播放时间
  const [currentTime, setCurrentTime] = useState(0);
  //歌曲总时长
  const [duration, setDuration] = useState(0);

  //歌曲播放进度
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  const handleFullScreen = (flag?: boolean) => {
    dispatch(changeFullScreen(flag));
  };
  const handlePlaying = () => {
    dispatch(changePlayingState(!playing));
  };
  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing]);
  useEffect(() => {
    if (!playList.length || currentIndex === -1 || !playList[currentIndex])
      return;

    let current = playList[currentIndex];
    dispatch(changeCurrentSong(current));
    audioRef.current.src = getSongUrl(current.id);
    setTimeout(() => {
      audioRef.current.play();
    });
    dispatch(changePlayingState(true)); //播放状态
    setCurrentTime(0); //从头开始播放
    setDuration((current.dt / 1000) | 0); //时长
  }, [currentIndex, currentSong, dispatch, playList]);

  const updateTime: any = (e: any) => {
    setCurrentTime(e.target.currentTime);
  };
  const onProgressChange = (curPercent: number) => {
    const newTime = curPercent * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    if (!playing) {
      dispatch(changePlayingState(true)); //播放状态
    }
  };
  //一首歌循环
  const handleLoop = () => {
    audioRef.current.currentTime = 0;
    dispatch(changePlayingState(true));
    audioRef.current.play();
  };
  const handlePrev = () => {
    //播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex - 1;
    if (index < 0) index = playList.length - 1;
    if (!playing) dispatch(changePlayingState(true)); //播放状态
    dispatch(changeCurrentIndex(index));
  };

  const handleNext = () => {
    //播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex + 1;
    if (index === playList.length) index = 0;
    if (!playing) dispatch(changePlayingState(true)); //播放状态
    dispatch(changeCurrentIndex(index));
  };
  if (!Array.isArray(playList) || playList.length === 0) {
    return <audio ref={audioRef} onTimeUpdate={updateTime}></audio>;
  }
  return (
    <>
      {!fullScreen ? (
        <MiNIPlayer
          handleFullScreen={handleFullScreen}
          handlePlaying={handlePlaying}
          isPlay={playing}
          currentSong={currentSong}
        />
      ) : (
        <NoramlPlayer
          handleFullScreen={handleFullScreen}
          handlePlaying={handlePlaying}
          isPlay={playing}
          percent={percent}
          onProgressChange={onProgressChange}
          currentTime={currentTime}
          duration={duration}
          handlePrev={handlePrev}
          handleNext={handleNext}
          currentSong={currentSong}
        />
      )}
      <audio ref={audioRef} onTimeUpdate={updateTime}></audio>
    </>
  );
};
const Player: React.FC = function() {
  return <PgPlayer />;
};

export default Player;
