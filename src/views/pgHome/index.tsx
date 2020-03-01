import React from "react";
import { renderRoutes, RouteConfig } from "react-router-config";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Player from "../player";
import "./index.scss";
let tabBars: Array<any> = [
  {
    title: "排行榜",
    paths: "/rank"
  },
  {
    title: "发现",
    paths: "/home/discovery"
  },
  {
    title: "云村",
    paths: "/home/cloud"
  },
  {
    title: "歌手",
    paths: "/home/singer"
  }
];
export interface IPHome {
  route: RouteConfig;
}

const Home: React.FC<IPHome> = function({ route }) {
  const history = useHistory();
  const handleClick = () => {
    history.push("/search");
  };
  return (
    <>
      <header className="home-header">
        <div className="slider-button">
          <i className={`iconfont icon-changyongicon-`}></i>
        </div>
        <div className="tab-bars">
          {tabBars.map((item, index) => {
            return (
              <NavLink to={item.paths} key={index} activeClassName="selected">
                {item.title}
              </NavLink>
            );
          })}
        </div>
        <div className="search" onClick={handleClick}>
          <i className={`iconfont icon-chazhao`}></i>
        </div>
      </header>
      {renderRoutes(route.routes)}
    </>
  );
};
export default React.memo(Home);
