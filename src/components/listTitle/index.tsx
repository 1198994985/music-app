import React from "react";
import "./index.scss";

export interface IPRowSlider {
  nums?: number; // 宽度100%，显示的item数量
  children?: React.ReactNode | string;
  title?: string;
  desc?:string

}
const Tittle: React.FC<IPRowSlider> = function({
  children,
  desc="",
  title = "123"
}) {
  return (
    <div>
      {desc && <div className="list-title-title-small">{desc} </div>}
      <section className="list-title-wrap">
        <div className="list-title">{title} </div>
        <div className="list-other">{children} </div>
      </section>
    </div>
  );
};
export default React.memo(Tittle);
