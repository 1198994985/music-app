import React, { useCallback, useEffect } from "react";
import { Loading, Banner, Card, Meta, Tittle, SubHeader } from "@/components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { renderRoutes ,RouteConfig} from "react-router-config";

import { getRankList, RankItem } from "./store/";
import { RankTypes } from "@/untils/config.ts";
import "./index.scss";

export const filterIdx = (name: string | number) => {
  for (let key in RankTypes) {
    // @ts-ignore
    if (RankTypes[key] === name) return key;
  }
  return null;
};
interface IPageRankList {
  route: RouteConfig;
}
const PageRankList: React.FC<IPageRankList> = function({ route }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const rankList = useSelector((state: any) => state.rank.rankList);
  console.log(rankList);
  useEffect(() => {
    if (!rankList.length) dispatch(getRankList());
  }, [dispatch, rankList.length]);
  const handleGoBack = useCallback(
    e => {
      history.go(-1);
    },
    [history]
  );
  const handleRankClick = useCallback(
    function(name: string | number) {
      let index = filterIdx(name);
      if (index) {
        history.push(`/home/rank/${index}`);
      }
    },
    [history]
  );

  return (
    <>
      <div className="ranklist-wrapper">
        <SubHeader title="排行榜" onClick={handleGoBack} />
        <div className="ranklist-content">
          <Tittle title="官方榜" />
          <div className="ranklist-box">
            {rankList.map((item: RankItem) => {
              return (
                <div
                  className="ranklist-item"
                  key={item.coverImgUrl}
                  onClick={() => {
                    handleRankClick(item.name);
                  }}
                >
                  <Card imageUrl={item.coverImgUrl}>
                    <Meta title={item.name} />
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {renderRoutes(route.routes)}
    </>
  );
};

export default React.memo(PageRankList);
