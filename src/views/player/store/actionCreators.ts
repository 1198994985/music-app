import {
  SET_CURRENT_SONG,
  SET_FULL_SCREEN,
  SET_PLAYING_STATE,
  SET_SEQUENCE_PLAYLIST,
  SET_PLAYLIST,
  SET_PLAY_MODE,
  SET_CURRENT_INDEX,
  SET_SHOW_PLAYLIST,
  DELETE_SONG,
  INSERT_SONG,
  SET_CURRENT_LYRICS
} from "./constants";
import {
  getSongDetailRequest,
  getSongLyricRequest,
  getSongUrl
} from "./service";

export const changeCurrentSong = (data: any) => ({
  type: SET_CURRENT_SONG,
  data
});

export const changeFullScreen = (data: any) => ({
  type: SET_FULL_SCREEN,
  data
});

export const changePlayingState = (data: any) => ({
  type: SET_PLAYING_STATE,
  data
});

export const changeSequencePlayList = (data: any) => ({
  type: SET_SEQUENCE_PLAYLIST,
  data
});

export const changePlayList = (data: any) => ({
  type: SET_PLAYLIST,
  data
});

export const changePlayMode = (data: any) => ({
  type: SET_PLAY_MODE,
  data
});

export const changeCurrentIndex = (data: any) => ({
  type: SET_CURRENT_INDEX,
  data
});

export const changeShowPlayList = (data: any) => ({
  type: SET_SHOW_PLAYLIST,
  data
});

export const insertSong = (data: any) => ({
  type: INSERT_SONG,
  data
});

export const deleteSong = (data: any) => ({
  type: DELETE_SONG,
  data
});

export const changeCurrentLyrics = (data: any) => ({
  type: SET_CURRENT_LYRICS,
  data
});

export const getSongDetail = (id: number) => {
  return (dispatch: any) => {
    getSongDetailRequest(id).then((data: any) => {
      let song = data.songs[0];
      dispatch(insertSong(song));
    });
  };
};

export const getSongLyric = (id: number) => {
  return (dispatch: any) => {
    getSongLyricRequest(id).then((data: any) => {
      let lyrics = {
        lyric: data.lrc.lyric,
        tlyric: data.tlyric.lyric
      };
      dispatch(changeCurrentLyrics(lyrics));
    });
  };
};


