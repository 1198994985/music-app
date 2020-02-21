import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo
} from "react";
import { Loading, Banner, Card, Meta, Tittle } from "@/components";
import { RowSlider, Nav } from "./components/";
import { imageLzy } from "@/untils/imageLazy";
import "./index.scss";
var tempUrl =
  "https://p2.music.126.net/7OiIpH11Ze8yni2oGMYnpA==/109951164653671933.jpg";


const PageDiscovery: React.FC = () => {
  useEffect(() => {
    imageLzy("img", el => {
     el.classList.add("opacityLinear");

    });
    return () => {};
  }, []);
  return (
    <>
      <Banner />
      <Nav />
      <Tittle />
      <RowSlider nums={3}>
        {[1, 2, 3, 4, 6, 7].map((i, index) => {
          return (
            <Card width={"100"} key={index} imageUrl={tempUrl}>
              <Meta title="冯博是一个特别帅的热嗯啊实打实大苏打实打实大苏打" />
            </Card>
          );
        })}
      </RowSlider>
      <Tittle />
      <RowSlider nums={3}>
        {[1, 2, 3, 4, 6, 7].map((i, index) => {
          return (
            <Card width={"100"} key={index} imageUrl={tempUrl}>
              <Meta title="冯博是一个特别帅的热嗯啊实打实大苏打实打实大苏打" />
            </Card>
          );
        })}
      </RowSlider>
      <Tittle />
      <RowSlider nums={3}>
        {[1, 2, 3, 4, 6, 7].map((i, index) => {
          return (
            <Card width={"100"} key={index} imageUrl={tempUrl}>
              <Meta title="冯博是一个特别帅的热嗯啊实打实大苏打实打实大苏打" />
            </Card>
          );
        })}
      </RowSlider>
      <div className="testlazy" style={{ width: 200, height: 200 }}>
        <img alt="" data-src={tempUrl} width="100%" height="400px" />
        <img alt="" data-src={tempUrl} width="100%" height="400px" />
        <img alt="" data-src={tempUrl} width="100%" height="400px" />

        <img alt="" data-src={tempUrl} width="100%" height="400px" />

        <img alt="" data-src={tempUrl} width="100%" height="400px" />

        <img alt="" data-src={tempUrl} width="100%" height="400px" />
        <img alt="" data-src={tempUrl} width="100%" height="400px" />
        <img alt="" data-src={tempUrl} width="100%" height="400px" />

        <img alt="" data-src={tempUrl} width="100%" height="400px" />
      </div>
      <Loading size="big" />
      <Loading size="middle" />
      <Loading size="small" />
    </>
  );
};
export default React.memo(PageDiscovery);
