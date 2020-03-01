import React, { useMemo, useRef, useState, useEffect } from "react";
import "./index.scss";
export interface IProcess {
  percentChange?: (percent: number) => void;
  percent?: number;
}
const Process: React.FC<IProcess> = function({ percentChange, percent = 0 }) {
  const progressBar = useRef<any>();
  const progress = useRef<any>();
  const progressBtn = useRef<any>();
  const [touch, setTouch] = useState<any>({});
  const [btnStyle, setBtnStyle] = useState({});
  const [processStyle, setprocessStyle] = useState({});

  useEffect(() => {
    if (percent >= 0 && percent <= 1 && !touch.initiated) {
      const barWidth =
        progressBar.current.clientWidth - progressBtn.current.clientWidth;
      const offsetWidth = percent * barWidth;
      setBtnStyle({ transform: `translate(${offsetWidth}px,-50%)` });
      setprocessStyle({ width: `${offsetWidth}px` });
    }
    // eslint-disable-next-line
  }, [percent]);
  const _changePercent = (offsetWidth?: number) => {
    const barWidth =
      progressBar.current.clientWidth - progressBtn.current.clientWidth;
    let curPercent;
    if (offsetWidth) {
      curPercent = offsetWidth / barWidth;
    } else {
      curPercent = progress.current.clientWidth / barWidth;
    }
    percentChange && percentChange(curPercent);
  };

  const progressTouchStart: React.TouchEventHandler = e => {
    const startPos = progress.current.clientWidth;
    const touchStart = e.touches[0].pageX;
    const touchFlag = true;
    setTouch({
      startPos,
      touchStart,
      touchFlag
    });
  };

  const progressTouchMove: React.TouchEventHandler = e => {
    if (!touch.touchFlag) return false;
    const moveLen = e.touches[0].pageX - touch.touchStart;
    const barWidth =
      progressBar.current.clientWidth - progressBtn.current.clientWidth;
    const offsetWidth = Math.min(
      Math.max(0, touch.startPos + moveLen),
      barWidth
    );
    _offset(offsetWidth);
  };
  const progressTouchEnd: React.TouchEventHandler = e => {
    const endTouch = JSON.parse(JSON.stringify(touch));
    endTouch.touchFlag = false;
    setTouch(endTouch);
    _changePercent();
  };
  const progressClick: React.MouseEventHandler = e => {
    const rect = progressBar.current.getBoundingClientRect();
    const offsetWidth = e.pageX - rect.left;
    _offset(offsetWidth);
    _changePercent(offsetWidth);
  };
  const _offset = (offsetWidth: any) => {
    setBtnStyle({ transform: `translate(${offsetWidth}px,-50%)` });
    setprocessStyle({ width: `${offsetWidth}px` });
  };

  return (
    <div className="fb-process-wrap" ref={progressBar} onClick={progressClick}>
      <div className="fb-process" ref={progress} style={processStyle}></div>
      <div
        className="fb-process-btn"
        ref={progressBtn}
        onTouchStart={progressTouchStart}
        onTouchMove={progressTouchMove}
        onTouchEnd={progressTouchEnd}
        style={btnStyle}
      ></div>
    </div>
  );
};
export default Process;
