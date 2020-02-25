import React, { useCallback, useEffect } from "react";
import { Loading, Banner, Card, Meta, Tittle, SubHeader } from "@/components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { renderRoutes ,RouteConfig} from "react-router-config";
import { getRankList, RankItem } from "./store/";
import { RankTypes } from "@/untils/config.ts";
import Scroll from "@/components/scroll/index";

import "./index.scss";

interface IPageRankList {
  route: RouteConfig;
}
const PageRankList: React.FC<IPageRankList> = function({ route }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const rankList = useSelector((state: any) => state.rank.rankList);
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
    function(id: string | number) {
        history.push(`/rank/${id}`);
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
                    handleRankClick(item.id);
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
