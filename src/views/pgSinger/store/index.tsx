import request from "@/untils/request";
import { produce } from "immer";

export enum SingerListType {
  CHANGE_SINGER_LIST = "home/songList/CHANGE_SINGER_LIST",
  CHANGE_LOADING = "home/songList/CHANGE_LOADING",
  CHANGE_DOWN_LOADING = "home/songList/CHANGE_DOWN_LOADING",
  CHANGE_UP_LOADING = "home/songList/CHANGE_UP_LOADING"
}

export function changeSingerList(data: any) {
  return {
    type: SingerListType.CHANGE_SINGER_LIST,
    data
  };
}
export function changeLoading(isLoading: boolean) {
  return {
    type: SingerListType.CHANGE_LOADING,
    data: isLoading
  };
}
export function changeDownLoading(isLoading: boolean) {
  return {
    type: SingerListType.CHANGE_DOWN_LOADING,
    data: isLoading
  };
}
export function changeUpLoading(isLoading: boolean) {
  return {
    type: SingerListType.CHANGE_UP_LOADING,
    data: isLoading
  };
}
const defaultState = {
  singerList: [],
  isloading: false,
  downloading: false,
  uploading: false
};
export default (state = defaultState, action: any) => {
  return produce(state, draft => {
    switch (action.type) {
      case SingerListType.CHANGE_SINGER_LIST:
        draft.singerList = action.data;
        break;
      case SingerListType.CHANGE_LOADING:
        draft.isloading = action.data;
        break;
      case SingerListType.CHANGE_DOWN_LOADING:
        draft.downloading = action.data;
        break;
      case SingerListType.CHANGE_UP_LOADING:
        draft.uploading = action.data;
        break;
      default:
        break;
    }
  });
};

export function getSingerList(
  category: string,
  alpha: string,
  count?: string | number
) {
  return (dispatch: any) => {
    dispatch(changeLoading(true));
    request(
      `/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&limit=${count}`
    )
      .then(data => {
        dispatch(changeSingerList(data.artists));
        dispatch(changeLoading(false));
      })
      .catch(error => {
        console.log("getSingerList ", error);
      });
  };
}
// 下拉刷新逻辑
export function pullDownSingerList(
  category: string,
  alpha: string,
  count?: string | number
) {
  return (dispatch: any) => {
    dispatch(changeDownLoading(true));
    request(
      `/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&limit=${count}`
    )
      .then(data => {
        dispatch(changeSingerList(data.artists));
        setTimeout(() => {
          dispatch(changeDownLoading(false));
        }, 100);
      })
      .catch(error => {
        console.log("getSingerList ", error);
      });
  };
}

// 下拉刷新逻辑
export function pullUpSingerList(
  category: string,
  alpha: string,
  count?: string | number
) {
  return (dispatch: any) => {
    dispatch(changeUpLoading(true));
    request(
      `/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&limit=${count}`
    )
      .then(data => {
        dispatch(changeSingerList(data.artists));
        setTimeout(() => {
          dispatch(changeUpLoading(false));
        }, 20);
      })
      .catch(error => {
        console.log("getSingerList ", error);
      });
  };
}
