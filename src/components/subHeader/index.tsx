import React from "react";
import "./index.scss";

export interface IPSubHeader {
  onClick?: React.MouseEventHandler;
  title?: string;
}
const SubHeader: React.FC<IPSubHeader> = function({ onClick, title = null }) {
  return (
    <header className="sub-header">
      <div className="back-button" onClick={onClick}>
        <i className={`iconfont icon-jiantoujinggao`}></i>
      </div>
      <div className="sub-header-title">{title}</div>
    </header>
  );
};
export default SubHeader;
