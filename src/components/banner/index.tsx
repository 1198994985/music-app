import React, { useEffect, useState } from "react";

import "swiper/css/swiper.css";
import Swiper from "swiper";
import "./index.scss"
export interface bannerItem {
  imageUrl: string;
}
export interface IPBanner {
  bannerList?: bannerItem[];
}
const bannerList2 = [1, 2, 3, 4].map(item => {
  return {
    imageUrl:
      "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg"
  };
});
const Banner: React.FC<IPBanner> = ({ bannerList = [...bannerList2] }) => {
  const [sliderSwiper, setSliderSwiper] = useState<Swiper>();

  useEffect(() => {
    if (bannerList.length && !sliderSwiper) {
      let slicerSwiper = new Swiper(".sliderContainer", {
        loop: true, // 无缝轮播
        autoplay: true,
        pagination: {
          el: ".swiper-pagination"
        }
      });
      setSliderSwiper(slicerSwiper);
    }
  }, [sliderSwiper, bannerList]);
  return (
    <div className="banner-wrapper">
      <div className="sliderContainer">
        <div className="swiper-wrapper">
          {bannerList.map((item,index) => {
            return (
              <div className="swiper-slide" key={item.imageUrl + index}>
                <div className="slide-wrapper">
                  <img
                    src={item.imageUrl}
                    alt="recommand"
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
};

export default React.memo(Banner);
