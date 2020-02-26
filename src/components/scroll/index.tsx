import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useImperativeHandle
} from "react";

import BScroll from "better-scroll";
import { Loading, LoadingContainer } from "@/components";
import "./index.scss"
// import { debounce } from '"utils/utils";'
import { debounce } from "@/untils/debounce.js";

const style = { width: "100%", height: "100%", overflow: "hidden" };
const PullUpLoadingStyle = {
  "z-index": "100",
  position: "absolute",
  left: 0,
  right: 0,
  bottom: "5px",
  width: " 60px",
  height: "60px",
  margin: "auto"
};

export const PullDownLoadingStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  top: "0",
  height:" 30px",
  margin: "auto",
  "z-index": "100",
};
interface ScrollProps {
  direction?: "vertical" | "horizontal";
  refresh?: boolean;
  onScroll?: Function;
  pullUp?: Function;
  pullDown?: Function;
  pullUpLoading?: boolean;
  pullDownLoading?: boolean;
  bounceTop?: boolean; //是否支持向上吸顶
  bounceBottom?: boolean; //是否支持向上吸顶
  click?: boolean;
  children?: React.ReactNode;
}

// export interface ScrollRef {
//   refresh(): void;
//   scrollTo(x: number, y: number): void;
//   getBScroll(): HTMLDivElement;
// }

const Scroll = forwardRef<any, ScrollProps>((props, ref) => {
  const [bScroll, setBScroll] = useState<any>();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const {
    direction = "vertical",
    click = true,
    refresh = true,
    pullUpLoading = false,
    pullDownLoading = false,
    bounceTop = true,
    bounceBottom = true
  } = props;

  const { pullUp = () => {}, pullDown = () => {}, onScroll = null } = props;

  useEffect(() => {
    if (bScroll) return;
    const scroll = new BScroll(scrollContainerRef.current!, {
      scrollX: direction === "horizontal",
      scrollY: direction === "vertical",
      probeType: 3,
      click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    setBScroll(scroll);
    if (pullUp) {
      scroll.on("scrollEnd", () => {
        //判断是否滑动到了底部
        if (scroll.y <= scroll.maxScrollY + 100) {
          pullUp();
        }
      });
    }
    if (pullDown) {
      scroll.on("touchEnd", (pos: any) => {
        //判断用户的下拉动作
        if (pos.y > 50) {
          debounce(pullDown, 0)();
        }
      });
    }

    if (onScroll) {
      //@ts-ignore
      scroll.on("scroll", (scroll: number) => {
        onScroll(scroll);
      });
    }

    if (refresh) {
      scroll.refresh();
    }
    return () => {
      //@ts-ignore
      scroll.off("scroll");
      setBScroll(null);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    scrollTo(x: number, y: number) {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(x, y);
      }
    },
    getBScroll() {
      return bScroll;
    }
  }));

  const PullUpdisplayStyle = pullUpLoading
    ? { display: "" }
    : { display: "none" };
  const PullDowndisplayStyle = pullDownLoading
    ? { display: "" }
    : { display: "none" };
  return (
    <div style={style} ref={scrollContainerRef}>
      {props.children}
      {/* 滑到底部加载动画 */}
      <div style={PullUpdisplayStyle} className="loading-up">
        <Loading />
      </div>
      {/* 顶部下拉刷新动画 */}
      <div style={PullDowndisplayStyle} className="loading-down">
        <Loading size="middle" positionStyle="0 auto"/>
      </div>
    </div>
  );
});

export default React.memo(Scroll);
