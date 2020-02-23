export interface bannerType {
  id: string | number;
  imageUrl: string;
  url: string;
}
export interface recommendType {
  id: string | number;
  name: string;
  picUrl: string;
  trackCount: number;
  playCount: number;
}
export interface recommendListType {
  recommendMvList: bannerType[];
  recommendSongList: bannerType[];
  recommendDjList: bannerType[];
}
export interface RecommendStateType {
  bannerList: bannerType[];
  recommendList: recommendListType;
  enterLoading: boolean;
}
