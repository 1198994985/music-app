import discovery from "@/views/pgDiscovery/store/reducer";
import { reducer as rank } from "@/views/pgRank/store";
import songList from "@/views/pgSongList/store";

import { combineReducers } from "redux";

export const Reducers = combineReducers({
  discovery,
  rank,
  songList
});
