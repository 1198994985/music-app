import actionTypes from "./constants";
import request from "@/untils/request";

import { recommendListType, recommendType } from "./data.d";

export interface changeBannerListType {
  type: actionTypes.CHANGE_BANNER;
  data: recommendType[];
}

export interface changeRecommendSongList {
  type: actionTypes.CHANGE_RECOMMEND_SONGLIST_LIST;
  data: recommendType[];
}
export interface changeRecommendMvList {
  type: actionTypes.CHANGE_RECOMMEND_MV_LIST;
  data: recommendType[];
}
export interface changeRecommendSong {
  type: actionTypes.CHANGE_RECOMMEND_SONG_LIST;
  data: recommendType[];
}
export interface changeRecommendDj {
  type: actionTypes.CHANGE_RECOMMEND_DJ_LIST;
  data: recommendType[];
}
export interface changeEnterLoadingType {
  type: actionTypes.CHANGE_ENTER_LOADING;
  data: boolean;
}

export type RecommendActionTypes =
  | changeBannerListType
  | changeRecommendSongList
  | changeRecommendMvList
  | changeRecommendSong
  | changeRecommendDj
  | changeEnterLoadingType;

export const changeBannerList = (
  data: recommendType[]
): changeBannerListType => ({
  type: actionTypes.CHANGE_BANNER,
  data
});

export const changeRecommendMvList = (
  data: recommendType[]
): changeRecommendMvList => ({
  type: actionTypes.CHANGE_RECOMMEND_MV_LIST,
  data
});
export const changeRecommendSong = (
  data: recommendType[]
): changeRecommendSong => ({
  type: actionTypes.CHANGE_RECOMMEND_SONG_LIST,
  data
});
export const changeRecommendDj = (
  data: recommendType[]
): changeRecommendDj => ({
  type: actionTypes.CHANGE_RECOMMEND_DJ_LIST,
  data
});
export const changeRecommendSongList = (
  data: recommendType[]
): changeRecommendSongList => ({
  type: actionTypes.CHANGE_RECOMMEND_SONGLIST_LIST,
  data
});

export const changeEnterLoading = (data: boolean): changeEnterLoadingType => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
});

export const getBannerList = function() {
  return (dispatch: any) => {
    request("/banner")
      .then(data => {
        const action = changeBannerList(data.banners);
        dispatch(action);
      })
      .catch(error => {
        console.log("getBannerList", error);
      });
  };
};
// 歌单推荐
export const getRecommdList = function() {
  return (dispatch: any) => {
    request("/personalized?limit=6")
      .then(data => {
        const action = changeRecommendSongList(data.result);
        dispatch(action);
      })
      .catch(error => {
        console.log("getRecommdList", error);
      });
  };
};
// mv推荐
export const getRecommdMvList = function() {
  return (dispatch: any) => {
    request("/personalized/mv?limit=6")
      .then(data => {
        const action = changeRecommendMvList(data.result);
        dispatch(action);
      })
      .catch(error => {
        console.log("getMvRecommdMvList", error);
      });
  };
};
// Dj推荐
export const getRecommdDjList = function() {
  return (dispatch: any) => {
    request("/personalized/djprogram?limit=6")
      .then(data => {
        const action = changeRecommendDj(data.result);
        dispatch(action);
      })
      .catch(error => {
        console.log("getMvRecommdDjList", error);
      });
  };
};
