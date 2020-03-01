import React, { useMemo, useCallback, useEffect, useReducer } from "react";
import { produce } from "immer";
import request from "@/untils/request";
import { debounce } from "@/untils/debounce.js";
import ListItem from "../pgSinger/component/listItem";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  changePlayingState,
  changeSequencePlayList,
  changeCurrentIndex,
  changePlayList
} from "../player/store/actionCreators";
import "./index.scss";
const defaultState = {
  serachValue: "",
  hotWords: [],
  songList: { songs: [], artists: [] }
};
const reducer = (state = defaultState, action: any) => {
  return produce(state, draft => {
    switch (action.type) {
      case "SET_SEARCH_VALUE":
        draft.serachValue = action.data;
        break;
      case "SET_HOT_WORDS":
        draft.hotWords = action.data;
        break;
      case "SET_SONG_LIST":
        draft.songList = action.data;
        break;
      default:
        break;
    }
  });
};
const rqSongList = debounce((value: string, dispatch: any) => {
  request(`/search/suggest?keywords=${value}`).then(data => {
    if (data?.result && data.code === 200) {
      dispatch({ type: "SET_SONG_LIST", data: data.result });
    }
  });
}, 300);
const PgSearch: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const history = useHistory();
  const handleChange: React.ChangeEventHandler = function(e) {
    // @ts-ignore
    dispatch({ type: "SET_SEARCH_VALUE", data: e.target.value.trim() });
  };
  useEffect(() => {
    request("/search/hot/detail").then(data => {
      let res = data.result?.hots || data?.data;
      if (res) {
        dispatch({ type: "SET_HOT_WORDS", data: res });
      }
    });
  }, []);
  useEffect(() => {
    if (state.serachValue) rqSongList(state.serachValue, dispatch);
  }, [state.serachValue]);

  const handleClickAll = useCallback(function (index: any = 0) {
    console.log(index, state.songList.songs);
    dispatch(changePlayList(state.songList.songs || []));
    dispatch(changeSequencePlayList(state.songList.songs || []));
    dispatch(changeCurrentIndex(index));
  }, [state.songList]);
  const handleGoBack = useCallback(
    e => {
      history.go(-1);
    },
    [history]
  );
  const renderSongList = useCallback(() => {
    let songs = [];
    let singer = [];

    if (state.songList && state.songList.songs) {
      songs =
        state.songList?.songs?.map((item: any, index: number) => {
          return (
            <div
              className="song-list-item"
              key={item.id}
              onClick={()=>{handleClickAll(index);}}
            >
              <div className="song-name-desc">
                <span className="song-name">{item.name}</span>
                <span className="song-desc">
                  {item?.alias[0] &&
                    item?.alias[0] + " " + item?.artists[0].name}
                </span>
              </div>
            </div>
          );
        }) || [];
      singer =
        state.songList?.artists?.map((item: any, index) => {
          return (
            <ListItem
              key={index}
              imageUrl={item.picUrl + "?param=100x100"}
              name={item.name}
              islazy={false}
            />
          );
        }) || [];
      return [...singer, ...songs];
    }
  }, [handleClickAll, state.songList]);
  const renderHotWord = useCallback(() => {
    let res = state.hotWords.map((item: any, index: number) => {
      return (
        <button
          className="hot-word"
          key={index}
          onClick={() => hotWordsClick(item.first || item.searchWord)}
        >
          {item.first || item.searchWord}
        </button>
      );
    });
    return <div className="hot-word-wrapper">{res}</div>;
  }, [state.hotWords]);
  const hotWordsClick = (value: string) => {
    dispatch({ type: "SET_SEARCH_VALUE", data: value });
  };
  return (
    <div className="search-container">
      <header className="search-header">
        <div className="back-button" onClick={handleGoBack}>
          <i className={`iconfont icon-jiantoujinggao`}></i>
        </div>
        <input
          className="search-input"
          value={state.serachValue}
          placeholder="冯博"
          onChange={handleChange}
        />
        <div className="back-button">
          <i className={`iconfont icon-chazhao`}></i>
        </div>
      </header>
      {!state.serachValue ? renderHotWord() : renderSongList()}
    </div>
  );
};
export default PgSearch;
