import React, {
  useMemo,
  useCallback,
  useEffect,
  useState,
  Children
} from "react";
import "./index.scss";

export interface IPRowSlider {
  nums?: number; // 宽度100%，显示的item数量
  children?: React.ReactNode | string;
}
const Tittle: React.FC<IPRowSlider> = function() {

  return (
    <>
      <div className="list-title-title-small">推荐歌单 </div>
      <section className="list-title-wrap">
        <div className="list-title">领略英语魅力 </div>
        <div className="list-other"> </div>
      </section>
    </>
  );
};
export default React.memo(Tittle);
