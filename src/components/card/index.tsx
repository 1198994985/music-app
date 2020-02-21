import React, { useMemo} from "react";
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
  onClick?: React.MouseEventHandler;
  playNums?: string | number;
}

const Card: React.FC<IPCard> = function({
  children,
  imageUrl = "",
  width = "100",
  onClick,
  playNums
}) {
  const style = useMemo(() => {
    return {
      width: `${width}%`
    };
  }, [width]);
  return (
    <>
      <div className="card-wrapper" style={style}>
        <div className="play-nums"> {playNums && ("▷"+playNums) }</div>
        <div className="card-img-wrapper">
          <img alt="" src={imageUrl} onClick={onClick} />
        </div>
        {children}
      </div>
    </>
  );
};
export default React.memo(Card);
