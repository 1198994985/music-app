import React, { useRef, useState, useEffect } from "react";
import LazyLoad, { forceCheck } from "react-lazyload";

import "./index.scss";

interface IPlistItem {
  imageUrl?: string;
  name?: string;
  handleClick?: () => void;
  islazy?: boolean;
}
const ListItem: React.FC<IPlistItem> = function({
  imageUrl = "",
  name = "冯博",
  handleClick,
  islazy=true
}) {
  const onClick1: React.MouseEventHandler = () => {
    if (handleClick) handleClick();
  }
  return (
    <div className="singer-list-item" onClick={onClick1}>
      {islazy ? (
        <img data-src={imageUrl} width="1rem" height="1rem" alt="music" />
      ) : (
        <img src={imageUrl} width="1rem" height="1rem" alt="music" />
      )}

      <div className="singer-list-name">{name}</div>
    </div>
  );
};

export default ListItem;
