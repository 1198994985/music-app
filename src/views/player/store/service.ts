import request from "@/untils/request";

export const getSongDetailRequest = (id: number) => {
  return request(`/song/detail?ids=${id}`);
};

export const getSongLyricRequest = (id: number) => {
  return request(`/lyric?id=${id}`);
};
export const getSongUrl = (id: number) => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};
