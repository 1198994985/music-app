import React, {
  useMemo,
  useCallback,
  useEffect,
  useState,
  Children
} from "react";
import { Loading, Banner, Card, Meta, Tittle, SubHeader } from "@/components";
import {useHistory} from "react-router-dom"
import "./index.scss";

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
          {[1, 2, 3, 4, 5].map(item => {
            return (
              <div className="ranklist-item">
                <Card imageUrl="https://p2.music.126.net/7OiIpH11Ze8yni2oGMYnpA==/109951164653671933.jpg">
                  <Meta title=" 123123213" />
                </Card>
              </div>
            );
          })}
        </div>
        <div className="ranklist-box">
          {[1, 2, 3, 4, 5].map(item => {
            return (
              <div className="ranklist-item">
                <Card imageUrl="https://p2.music.126.net/7OiIpH11Ze8yni2oGMYnpA==/109951164653671933.jpg">
                  <Meta title=" 123123213" />
                </Card>
              </div>
            );
          })}
        </div>
        <div className="ranklist-box">
          {[1, 2, 3, 4, 5].map(item => {
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
