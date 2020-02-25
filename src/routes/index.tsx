import React, { Suspense, lazy } from "react";
import { Redirect } from "react-router-dom";
import { RouteConfig } from "react-router-config";
import { Loading } from "@/components";
const lazyComponet = (Component: React.ElementType) => (props: any) => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  );
};

const HomeComponent = lazy(() => import("../views/pgHome"));
const DiscoveryComponent = lazy(() => import("@/views/pgDiscovery"));
const BannerComponent = lazy(() => import("@/components/banner"));
const RankListComponent = lazy(() => import("../views/pgRank"));
const SongListComponent = lazy(() => import("../views/pgSongList"));

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
        component: lazyComponet(DiscoveryComponent)
      },
      {
        exact: true,
        path: "/home/vedio",
        component: lazyComponet(SongListComponent)
      }
    ]
  },
  {
    path: "/rank",
    component: lazyComponet(RankListComponent),
    routes: [
      {
        path: "/rank/:id",
        component: lazyComponet(SongListComponent)
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
export default routeConfigs;
