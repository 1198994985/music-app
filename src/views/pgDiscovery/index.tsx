import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loading, Banner, Card, Meta, Tittle } from "@/components";
import { RowSlider, Nav } from "./components/";
import { imageLzy } from "@/untils/imageLazy";
import {
  getBannerList,
  getRecommdList,
  getRecommdDjList,
  getRecommdMvList
} from "./store/actionCreators";
import "./index.scss";
var tempUrl =
  "https://p2.music.126.net/7OiIpH11Ze8yni2oGMYnpA==/109951164653671933.jpg";

const PageDiscovery: React.FC = () => {
  const bannerList = useSelector((state: any) => state.discovery.bannerList);
  const recommendList = useSelector(
    (state: any) => state.discovery.recommendList
  );

  const dispatch = useDispatch();
  console.log(recommendList);
  useEffect(() => {
    imageLzy("img", el => {
      el.classList.add("opacityLinear");
    });
  }, []);
  useEffect(() => {
    if (!bannerList.length) dispatch(getBannerList());
    if (!recommendList.recommendSongList.length) dispatch(getRecommdList());
    if (!recommendList.recommendDjList.length) dispatch(getRecommdDjList());
    if (!recommendList.recommendMvList.length) dispatch(getRecommdMvList());
  }, [bannerList.length, dispatch, recommendList]);
  return (
    <>
      {bannerList && <Banner bannerList={bannerList} />}
      <Nav />
      <br />
      <Tittle desc="歌单推荐" title="为你精挑细选" />
      <RowSlider nums={3} recommendList={recommendList.recommendSongList} />
      <br />
      <br />

      <Tittle desc="MV推荐" title="为你精挑细选" />
      <RowSlider nums={2} recommendList={recommendList.recommendMvList} />
      <br />
      <br />
      <Tittle desc="电台推荐" title="为你精挑细选" />
      <RowSlider nums={3} recommendList={recommendList.recommendDjList} />

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
