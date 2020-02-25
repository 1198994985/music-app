import React, {
  useMemo,
  useCallback,
  useEffect,
  useState,
  useRef
} from "react";
import { Card, Meta, Tittle } from "@/components";
import Scroll from "@/components/scroll/index";

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
  onClick?: React.MouseEventHandler;
}
const RowSlider: React.FC<IPRowSlider> = function({
  children,
  nums = 1,
  recommendList = [],
  onClick
}) {
  const target = useRef<any>(null);
  const itemStyle = useMemo(() => {
    //@ts-ignore
    let size = getComputedStyle(window.document.documentElement)["font-size"];
    size = Number(size.slice(0, -2)) / 100;
    let cliWidth = document.body.clientWidth;
    let widthrem = cliWidth / size;
    return {
      flex: `1 0 ${(widthrem * 0.88) / nums / 100}rem`,
      width: `${(widthrem * 0.88) / nums / 100}rem`
    };
  }, [nums]);
  useEffect(() => {
    if (recommendList.length) {
      let categoryDOM = target.current;
      let tagElems = categoryDOM.querySelectorAll(".row-slider-item");

      let totalWidth = 0;
      Array.from(tagElems).forEach((ele: any) => {
        totalWidth += ele.offsetWidth;
      });
      categoryDOM.style.width = `${totalWidth}px`;
    }
  }, [recommendList]);
  return (
    <Scroll direction="horizontal" refresh={true}>
      <div className="row-slider-wrap" ref={target}>
        {recommendList.map((item, index) => {
          return (
            <div
              className="row-slider-item"
              style={itemStyle}
              key={item.picUrl + index}
              onClick={onClick}
            >
              <Card
                width={"100"}
                imageUrl={item.picUrl}
                playNums={item.playCount}
              >
                <Meta title={item.name} />
              </Card>
            </div>
          );
        })}
      </div>
    </Scroll>
  );
};
export default React.memo(RowSlider);
