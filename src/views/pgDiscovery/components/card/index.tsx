import React, { useMemo, useCallback, useEffect, useState } from "react";
import "./index.scss";
export interface IPMeta {
  title?: string;
  desc?: string;
}
export const Meta: React.FC<IPMeta> = function({ title = "", desc }) {
  if (desc && title) {
    return (
      <>
        <div className="card-meta-title">{title}</div>
        <div className="card-meta-desc">{desc}</div>
      </>
    );
  } else if (title) {
    return (
      <>
        <div className="card-meta-title card-meta-title-Ellipsis">{title}</div>
      </>
    );
  }
  return null;
};
export interface DataItem {
  imageUrl?: string;
  desc?: string;
  playNums?: string | number;
}
export interface IPCard {
  cardData?: DataItem[];
  width?: string;
  children?: React.ReactNode | string;
  imageUrl?: string;
}
const mock2 = [
  {
    imageUrl:
      "https://p2.music.126.net/7OiIpH11Ze8yni2oGMYnpA==/109951164653671933.jpg",
    desc: "冯博太帅了"
  }
];
const Card: React.FC<IPCard> = function({
  children,
  imageUrl = "",
  cardData = mock2,
  width = "100"
}) {
  const style = useMemo(() => {
    return {
      width: `${width}%`
    };
  }, [width]);
  return (
    <>
      <div className="card-wrapper" style={style}>
        <div className="card-img-wrapper">
          <img alt="" src={imageUrl} />
        </div>
        {children}
      </div>
    </>
  );
};
export default React.memo(Card);
