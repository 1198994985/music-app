### alias 配置

```
yarn add react-app-rewired customize-cra
```

```
/* package.json */
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
}
```

项目文件夹下新建文件`config-overrides.js`

```
const {
  override,
  addWebpackAlias,
  addDecoratorsLegacy
} = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@": path.resolve(__dirname, "src")
  }),
  addDecoratorsLegacy()
);


```
在项目文件夹顶层新建`paths.json`
```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"]
    }
  }
}

```
在`tsconfig.json` 添加` "extends": "./paths.json"`

### 添加 scss 支持

```
yarn add node-sass
```

### 设置 vieport 标签

移动端项目,设置缩放比 1.0,不可缩放

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
/>
```

### 格式初始化

添加初始化 css

###

```
// body 下添加
 -webkit-tap-highlight-color:transparent;
```

媒体查询设置最大宽度

```css
/* 大于750px，设置最大字体大小，防止宽度过大导致字体畸变 */
@media screen and (min-width: 750px) {
  #root {
    overflow: hidden;
    width: 750px;
    margin: 0 auto !important;
    /* 根节点设置默认字体大小 */
    font-size: 16px;
  }
  html {
    font-size: 100px !important;
  }
}

/* 小于750px情况用vw自适应 */
@media screen and (max-width: 750px) {
  #root {
    width: 100%;
    background: #fff;
    font-size: 2.133333333333vw;
  }
  html {
    font-size: 13.33333333333333vw !important;
  }
}
body,
html {
  height: 100%;
}
#root {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}
```

安装相关库
将所有的@types 放到 devDependencies 中

```
yarn add [package] --dev
```

// 搭建 redux 相关环境

// -webkit-overflow-scrolling: touch

### 添加全局样式

```css
$theme-color: #ff2007;
$theme-color-shadow: #ff5d47;
$font-color: #323031;
$font-color: #7c7c7c;
$font-color: #c6c6c6;

$font-size_12: 12px;
$font-size_14: 14px;
$font-size_16: 16px;
$font-size_18: 18px;
$font-size_20: 20px;

$border-color: #e4e4e4;
$background-color: #f2f3f4;
$background-color-shadow: rgba(0, 0, 0, 0.3);
$highlight-background-color: #fff;

// 单行文本截断
@mixin SingleLineEllipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

// 扩大可点击区域
@mixin extendClick {
  　position: relative;
  &::after {
    content: "";
    position: absolute;
    left: -10px;
    top: -10px;
    right: -10px;
    bottom: -10px;
  }
}
```

### 路由配置
路由懒加载
```javascript
import React, { Suspense, lazy } from "react";
import { Redirect } from "react-router-dom";
import { RouteConfig } from "react-router-config";

const lazyComponet = (Component: React.ElementType) => (props: any) => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  );
};

const HomeComponent = lazy(() => import("../views/pgHome"));
const LoadingComponent = lazy(() => import("../components/loading"));

const routeConfigs: RouteConfig[] = [
  { path: "/", exact: true, render: () => <Redirect to={"/home"} /> },
  {
    path: "/home",
    component: lazyComponet(HomeComponent),
    routes: [
      {
        path: "/home",
        exact: true,
        render: () => <Redirect to={"/home/discovery"} />
      },

      {
        path: "/home/cloud",
        exact: true,
        render: () => {
          return <div className="bobo">123</div>;
        }
      },
      {
        path: "/home/discovery",
        component: lazyComponet(LoadingComponent)
      },
      {
        exact: true,
        path: "/home/vedio",
        render: () => {
          return <div className="bobo">vedio</div>;
        }
      },
      {
        exact: true,
        path: "/home/my",
        render: () => {
          return <div className="bobo">my</div>;
        }
      }
    ]
  },
  {
    path: "/loginPhone",
    component: lazyComponet(HomeComponent)
  },
  {
    path: "/loginPassword",
    component: lazyComponet(HomeComponent)
  },
  {
    path: "/wrong",
    component: lazyComponet(HomeComponent)
  }
];
```
### loading组件
将引入的 svg 作为react组件的返回值,封装
开放
```js
export interface IPLoading {
  isLoading?: boolean;
  className?: string;
  dur?: number;
  color?: string;
  size?:"small" | "middle" |"big"
}
```

### redux 准备
```js
// store/index.tsx
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import Reducers from './reducer'

const composeEnhancers = compose;

const store = createStore(Reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;
// store/reducer.tsx
import {combineReducers} from "redux"
export  default combineReducers({

})
```
