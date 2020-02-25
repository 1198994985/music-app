import request from "@/untils/request";
import { produce } from "immer";

export enum SongListType {
  CHANGE_SONG_LIST = "home/songList/CHANGE_SONG_LIST",
  CHANGE_LOADING = "home/songList/CHANGE_LOADING"
}

export function changeSongList(data: any) {
  return {
    type: SongListType.CHANGE_SONG_LIST,
    data
  };
}
export function changeLoading(isLoading: boolean) {
  return {
    type: SongListType.CHANGE_LOADING,
    data: isLoading
  };
}
const defaultState = {
  songList: [],
  isloading: false,
  startIndex: 0,
  totalCount: 0,
  description: {
    description: "",
    coverImgUrl: "",
    playCount: 0,
    name: "",
    subscribedCount: "",
    nickname: "",
    avatarUrl: ""
  }
};
export default (state = defaultState, action: any) => {
  return produce(state, draft => {
    switch (action.type) {
      case SongListType.CHANGE_SONG_LIST:
        draft.songList = action.data.tracks;
        draft.description = {
          description: action.data.description,
          coverImgUrl: action.data.coverImgUrl,
          playCount: action.data.playCount,
          name: action.data.name,
          subscribedCount: action.data.subscribedCount,
          nickname: action.data.creator.nickname,
          avatarUrl: action.data.creator.avatarUrl
        };
        break;
      case SongListType.CHANGE_LOADING:
        draft.isloading = action.data;
        break;
      default:
        break;
    }
  });
};

export function getSongList(id: string | number) {
  return (dispatch: any) => {
    dispatch(changeLoading(true));
    request(`/playlist/detail?id=${id}`)
      .then(data => {
        dispatch(changeSongList(data.playlist));
        dispatch(changeLoading(false));
      })
      .catch(error => {
        console.log("getSongList ", error);
      });
  };
}
