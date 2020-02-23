import actionTypes from "./constants";
import produce from "immer";
import { RecommendStateType } from "./data.d";

const defaultState: RecommendStateType = {
  bannerList: [],
  recommendList: {
    recommendMvList: [],
    recommendSongList: [],
    recommendDjList: []
  },
  enterLoading: true
};

export default (state = defaultState, action: any) => {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.CHANGE_BANNER:
        draft.bannerList = action.data;
        break;
      case actionTypes.CHANGE_RECOMMEND_SONGLIST_LIST:
        draft.recommendList.recommendSongList = action.data;
        break;
      case actionTypes.CHANGE_RECOMMEND_SONG_LIST:
        draft.recommendList.recommendSongList = action.data;
        break;
      case actionTypes.CHANGE_RECOMMEND_MV_LIST:
        draft.recommendList.recommendMvList = action.data;
        break;
      case actionTypes.CHANGE_RECOMMEND_DJ_LIST:
        draft.recommendList.recommendDjList = action.data;
        break;
      case actionTypes.CHANGE_ENTER_LOADING:
        draft.enterLoading = action.data;
    }
  });
};
