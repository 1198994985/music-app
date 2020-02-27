import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loading, Banner, Card, Meta, Tittle } from "@/components";
import { useHistory } from "react-router-dom";

import { RowSlider, Nav } from "./components/";
import { imageLzy } from "@/untils/imageLazy";
import Scroll from "@/components/scroll/index";

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
  const history = useHistory();
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
  const handleClick = (id: number) => {
    history.push("/rank/"+id)

  };
  return (
    <Scroll direction={"vertical"}>
      <article className="home-warp">
        {bannerList && <Banner bannerList={bannerList} />}
        <Nav />
        <br />
        <Tittle desc="歌单推荐" title="为你精挑细选" />
        <RowSlider
          nums={3}
          recommendList={recommendList.recommendSongList}
          onClick={handleClick}
        />
        <br />
        <br />

        <Tittle desc="MV推荐" title="为你精挑细选" />
        <RowSlider nums={2} recommendList={recommendList.recommendMvList} />
        <br />
        <br />
        <Tittle desc="电台推荐" title="为你精挑细选" />
        <RowSlider nums={3} recommendList={recommendList.recommendDjList} />
      </article>
    </Scroll>
  );
};
export default React.memo(PageDiscovery);
