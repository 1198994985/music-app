import { produce } from "immer";
import request from "@/untils/request";

export enum RankListType {
  CHANGE_RANK_LIST = "home/rank/CHANGE_RANK_LIST",
  CHANGE_LOADING = "home/rank/CHANGE_LOADING"
}
export interface RankItem {
  id: string | number;
  name: string;
  coverImgUrl: string;
}


export const changeRankList = (data: RankItem[]) => {
  return {
    type: RankListType.CHANGE_RANK_LIST,
    data
  };
};

let defaultState = {
  rankList: [],
  isLoading:false
}
export const reducer = (state = defaultState, action: any) => {
  return produce(state, draft => {
    switch (action.type) {
      case RankListType.CHANGE_RANK_LIST:
        draft.rankList = action.data;
        break;
      default:
        break;
    }
  });
 }

export function getRankList(){
  return (dispatch:any) => {
    request("/toplist/detail")
      .then(data => {
        dispatch(changeRankList(data.list));
      })
      .catch(error => {
        console.log("requestRankList", error);
      });
  }
}