import { Children } from "react";

export const debounce = (fn, time=300, immediate) => {
  let timeout, result;
  return function(...args) {
    let that = this;
    if (timeout) {
      clearTimeout(timeout);
    }
    if (immediate) {
      let callNow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, time);
      if (callNow) result = fn.apply(that, args);
    } else {
      timeout = setTimeout(function() {
        result = fn.apply(that, args);
      }, time);
    }
    return result;
  };
};
const throttle = (fn, wait, immediate) => {
  let timeout;
  return function(...args) {
    let that = this;
    if (immediate && !timeout) {
      fn.apply(that, args);
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      return;
    }
    if (!timeout) {
      timeout = setTimeout(() => {
        fn.apply(that, args);
        timeout = null;
      }, wait);
    }
  };
};
