import React, {
  useMemo,
  useCallback,
  useEffect,
  useState,
  Children
} from "react";
import { Loading, Banner, Card, Meta, Tittle } from "@/components";
import {useHistory} from "react-router-dom"
import "./index.scss";

export interface IPSubHeader {
  onClick?: React.MouseEventHandler;
  title?: string;
}
const SubHeader: React.FC<IPSubHeader> = function({ onClick, title = null }) {
  return (
    <header>
      <div className="back-button" onClick={onClick}>
        <i className={`iconfont icon-jiantoujinggao`}></i>
      </div>
      <div className="sub-header-title">{title}</div>
    </header>
  );
};
const PageRankList: React.FC = function (props) {
  const history = useHistory();
  const handleGoBack = useCallback(
    (e) => {
      history.go(-1);
    },
    [history],
  )
  return (
    <div className="ranklist-wrapper">
      <SubHeader title="排行榜" onClick={handleGoBack} />

      <div className="ranklist-content">
        <Tittle title="官方榜" />

        <div className="ranklist-box">
          {[1, 2, 3, 4, 5, 6, 7].map(item => {
            return (
              <div className="ranklist-item">
                <Card imageUrl="https://p2.music.126.net/7OiIpH11Ze8yni2oGMYnpA==/109951164653671933.jpg">
                  <Meta title=" 123123213" />
                </Card>
              </div>
            );
          })}
        </div>
        <Tittle title="官方榜" />
        <div className="ranklist-box">
          {[1, 2, 3].map(item => {
            return (
              <div className="ranklist-item">
                <Card imageUrl="https://p2.music.126.net/7OiIpH11Ze8yni2oGMYnpA==/109951164653671933.jpg">
                  <Meta title=" 123123213" />
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(PageRankList);
