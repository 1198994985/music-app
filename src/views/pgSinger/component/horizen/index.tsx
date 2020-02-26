import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import Scroll from "@/components/scroll/index";
import "./index.scss";
type listItem = {
  name: string;
  key: string;
};
interface IPHorizen {
  list?: listItem[];
  oldVal?: string;
  title?: string;
  handleClick?: (key: string) => void;
}
const Horizen: React.FC<IPHorizen> = function({
  list = [],
  oldVal = "",
  title = "",
  handleClick
}) {
  const Category = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let categoryDOM = Category.current;
    if (categoryDOM) {
      let tagElems = categoryDOM.querySelectorAll("span");
      let totalWidth = 0;
      if (tagElems) {
        Array.from(tagElems).forEach(ele => {
          totalWidth += ele.offsetWidth;
        });
      }
      totalWidth += 2;
      categoryDOM.style.width = `${totalWidth}px`;
    } 
  }, []);

  return (
    <Scroll direction={"horizontal"} refresh={true}>
      <div className="horizontal-list" ref={Category}>
        <span>{title}</span>
        {list.map(item => {
          return (
            <span
              key={item.key}
              className={`${
                oldVal === item.key
                  ? "selected horizontal-list-item"
                  : "horizontal-list-item"
              }`}
              onClick={handleClick && (() => handleClick(item.key))}
            >
              {item.name}
            </span>
          );
        })}
      </div>
    </Scroll>
  );
};
export default React.memo(Horizen);
