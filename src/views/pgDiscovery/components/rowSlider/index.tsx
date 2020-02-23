import React, {
  useMemo,
  useCallback,
  useEffect,
  useState,
  Children
} from "react";
import { Card, Meta, Tittle } from "@/components";

import "./index.scss";

export interface recommendItem {
  picUrl: string;
  name: string;
  copywriter: string;
  playCount?: string | number;
}

export interface IPRowSlider {
  nums?: number; // 宽度100%，显示的item数量
  children?: React.ReactNode | string;
  recommendList?: recommendItem[];
}
const RowSlider: React.FC<IPRowSlider> = function({
  children,
  nums = 1,
  recommendList = []
}) {
  const itemStyle = useMemo(() => {
    return {
      flex: `1 0 ${93 / nums}%`,
      width: `${93 / nums}%`
    };
  }, [nums]);

  return (
    <>
      <div className="row-slider-wrap">
        {recommendList.map((item, index) => {
          return (
            <div
              className="row-slider-item"
              style={itemStyle}
              key={item.picUrl + index}
            >
              <Card width={"100"} imageUrl={item.picUrl} playNums={item.playCount}>
                <Meta title={item.name}  />
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default React.memo(RowSlider);
