import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renderRoutes, RouteConfig } from "react-router-config";
import { useHistory } from "react-router-dom";
import Scroll from "@/components/scroll/index";
import { getSingerList, pullDownSingerList, pullUpSingerList } from "./store";
import Horizen from "./component/horizen/";
import ListItem from "./component/listItem/";
import { categoryTypes, alphaTypes } from "@/untils/config";
import { imageLzy } from "@/untils/imageLazy";
import { Loading, LoadingContainer } from "@/components";
import "./index.scss";
interface IPageSinger {
  route: RouteConfig;
}
const PageSinger: React.FC<IPageSinger> = function({ route }) {
  const [category, setCategory] = useState<string>("");
  const [alpha, setAlpha] = useState<string>("");
  const singerList = useSelector((state: any) => state.pgSinger.singerList);
  const loading = useSelector((state: any) => ({
    downloading: state.pgSinger.downloading,
    uploading: state.pgSinger.uploading,
    isloading: state.pgSinger.isloading
  }));
  const scrollRef = React.useRef();
  const history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingerList(category as string, alpha as string, 100));
  }, [alpha, category, dispatch]);
  useEffect(() => {
    imageLzy(".singer-list-item img", el => {
      el.classList.add("opacityLinear");
    });
  }, [singerList]);
  const handleUpdateCategory = (newVal: string) => {
    if (category === newVal) return;
    setCategory(newVal);
    //@ts-ignore
    scrollRef.current.refresh();
  };

  const handleUpdateAlpha = (newVal: string) => {
    if (alpha === newVal) return;
    setAlpha(newVal);
    //@ts-ignore
    scrollRef.current.refresh();
  };
  const handleRankClick = useCallback(
    function(id: string | number) {
      history.push(`/home/singer/${id}`);
    },
    [history]
  );

  const handDownLoading = () => {
    dispatch(pullDownSingerList(category as string, alpha as string, 100));
  };
  const handUpLoading = () => {
    dispatch(pullDownSingerList(category as string, alpha as string, 200));
  };
  return (
    <>
      <Scroll
        direction={"vertical"}
        pullUpLoading={loading.uploading}
        pullDownLoading={loading.downloading}
        pullUp={handUpLoading}
        pullDown={handDownLoading}
        ref={scrollRef}
      >
        <article className="home-warp">
          <div className="singer-nav-container">
            <Horizen
              list={categoryTypes}
              title={"分类 (默认热门):"}
              handleClick={handleUpdateCategory}
              oldVal={category}
            ></Horizen>
            <Horizen
              list={alphaTypes}
              title={"首字母:"}
              handleClick={handleUpdateAlpha}
              oldVal={alpha}
            ></Horizen>
          </div>
          <div style={{ position: "relative" }}>
            {loading.isloading && (
              <LoadingContainer positionStyle="absolute">
                <Loading positionStyle="5rem auto" />
              </LoadingContainer>
            )}
            {singerList.map((item: any, index: number) => {
              return (
                <ListItem
                  key={item.id}
                  imageUrl={item.picUrl + "?param=200x200"}
                  name={item.name}
                  handleClick={() => handleRankClick(item.id)}
                  islazy={true}
                />
              );
            })}
          </div>
        </article>
      </Scroll>
      {renderRoutes(route.routes)}
    </>
  );
};
export default React.memo(PageSinger);
