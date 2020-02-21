import React, {useMemo, useCallback, useEffect, useState, Children } from "react";
import "./index.scss";

export interface IPRowSlider {
  nums?: number; // 宽度100%，显示的item数量
  children?: React.ReactNode | string;
}
const RowSlider: React.FC<IPRowSlider> = function({ children, nums = 1 })  {
  const itemStyle = useMemo(() => {
    return {
      flex: `1 0 ${93 / nums}%`,
      width: `${93 / nums}%`
    };
  }, [nums]);

  return (
    <>
      <div className="row-slider-wrap">
        {React.Children.map(children, (item, index) => {
          return (
            <div className="row-slider-item" style={itemStyle} key={index}>
              {item}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default React.memo(RowSlider);
