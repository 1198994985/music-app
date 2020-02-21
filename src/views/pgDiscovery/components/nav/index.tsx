import React, { useMemo, useCallback, useEffect, useState } from "react";
import "./index.scss";
export interface IPNavItem {
  code?: string;
  className?: string;
  title?: string;
}
const navListConfig = [
  {
    title: "每日推荐",
    code: `icon-rili2`,
    path: ""
  },
  {
    title: "歌单",
    code: `icon-gedan1`,
    path: ""
  },
  {
    title: "排行榜",
    code: `icon-paihang`,
    path: ""
  },
  {
    title: "电台",
    code: `icon-diantai`,
    path: ""
  },
  {
    title: "歌手",
    code: `icon-geshou`,
    path: ""
  }
];
const NavItem: React.FC<IPNavItem> = function({
  code = "icon-paihang",
  className = "nav-item",
  title="xxx"
}) {
  return (
    <div className="nav-item-wrapper">
      <div className="nav-icon-wrapper">
        <i className={`iconfont ${code}  ${className}`}></i>
      </div>
      <span>{title}</span>
    </div>
  );
};
type navitem = {
  title: string,
  path?: string,
  code:string
}
export interface IPNav {
  navList?: navitem[];
}
const Nav: React.FC<IPNav> = function({ navList = navListConfig }) {
  return <div className="nav-wrapper">
    {navList.map((item,index) => {
      return <NavItem key={item.code+index} code={item.code} title={item.title}/>;
    })}
  </div>;
};
export default React.memo(Nav);
