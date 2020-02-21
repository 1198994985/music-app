import React from "react";
import { renderRoutes, RouteConfig } from "react-router-config";
import { NavLink, Link } from "react-router-dom";
import "./index.scss";
let tabBars: Array<any> = [
  {
    title: "我的",
    paths: "/home/my"
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
    title: "视频",
    paths: "/home/vedio"
  }
];
export interface IPHome {
  route: RouteConfig;
}

const Home: React.FC<IPHome> = function({ route }) {
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
        <div className="search">
          <i className={`iconfont icon-chazhao`}></i>
        </div>
      </header>
      <article className="home-warp">
        {/* {Array.from({ length: 5 }, iten => {
          return (
            <div
              style={{
                height: 200,
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                marginBottom: 10
              }}
            ></div>
          );
        })} */}
        {renderRoutes(route.routes)}
      </article>
    </>
  );
};
export default React.memo(Home);
