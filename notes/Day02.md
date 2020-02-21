### 轮播组件开发

/components/banner

如果存在溢出，可以整个页面向左划，则在顶层容器添加`overflow-x: hidden;`

```js
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
          {bannerList.map(item => {
            return (
              <div className="swiper-slide" key={item.imageUrl}>
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

```

### 横向滑动

主要在 wrap 中设置`overflow-x`,`display:flex`;在子元素中设置`flex:1 0 百分比%`

```js
.row-slider-wrap {
  display: flex;
  overflow-x: auto;
  width: 100%;
  height: 25vw;
  flex-direction: row;
  flex-wrap: nowrap;
  // 隐藏滚动条
  &::-webkit-scrollbar {
    display: none;
  }
}

.item {
  box-sizing: border-box;
  flex:1 0 31%;
  width:31%;
  padding-left: 0.05rem;
  background-clip: content-box;
  background-color: green;
}
```

### 引入字体图标

选择案例字体图标，添加至购物车并添加至项目，生成 cdn 链接
采用 unicode 形式，添加如下代码,

```html
<link
      type="text/css"
      rel="styleSheet"
      href="//at.alicdn.com/t/font_1648340_nmwaymumqxd.css"
    />

```
### 多行文本截断
```
.card-meta-desc {
  font-size: $font-size_14 * 1.4;
  color: $font-color_3;
  position: relative;
  max-height: $font-size_14 * 4.2;
  line-height: 1.5;
  overflow: hidden;
  &::before {
    content: "...";
    position: absolute;
    z-index: 1;
    bottom: 0;
    right: 0;
    width: 1.5em;
    padding-left: 0.01rem;
    box-sizing: border-box;
    background-color: white;
  }
  &::after {
    content: "";
    display: inline-block;
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: white;
  }
```
