import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo
} from "react";
import { Loading, Banner } from "@/components";
import { RowSlider, Nav, Card, Meta, Tittle } from "./components/";
import "./index.scss";
var tempUrl =
  "https://p2.music.126.net/7OiIpH11Ze8yni2oGMYnpA==/109951164653671933.jpg";

const PageDiscovery: React.FC = () => {

  useEffect(() => {
    let observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry && entry.isIntersecting) {
            // @ts-ignore
            entry.target.src = entry.target.dataset.src;
            // io.unobserve(entry.target);
            var img = entry.target;
            // @ts-ignore
            img.src = img.dataset.src;
            // @ts-ignore
            console.log(entry);
            // @ts-ignore
            observer.unobserve(img);
          }
        });
      },
      {
        threshold: [0.01, ], // 添加触发时机数组
      
      }
    );
    let imgLists = document.querySelectorAll(".testlazy img");
    imgLists.forEach(item => {
      // @ts-ignore
      observer.observe(item); // 添加需要被观察的元素。
    });
    return () => {};
  }, []);
  return (
    <>
      <Banner />
      <Nav />
      <Loading size="big" />
      <Loading size="middle" />
      <Loading size="small" />
      <Tittle />
      <RowSlider nums={4}>
        {[1, 2, 3, 4, 6, 7, 8, 9, 11, 12].map((i, index) => {
          return (
            <Card width={"100"} key={index} imageUrl={tempUrl}>
              <Meta title="冯博是一个特别帅的热嗯啊实打实大苏打实打实大苏打" />
            </Card>
          );
        })}
      </RowSlider>

      <div className="testlazy" style={{ width: 200, height: 200 }}>
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
        <img alt="" data-src={tempUrl} width="100%" height="300px" />
      </div>
    </>
  );
};
export default React.memo(PageDiscovery);
