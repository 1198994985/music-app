import { Children } from "react";

const debouce = (fn, time, immediate) => {
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
    }
    if (!timeout) {
      timeout = setTimeout(() => {
        fn.apply(that, args);
        timeout = null;
      }, wait);
    }
  };
};

const newFn = function(fn, ...args) {
  let obj = {};
  obj.__proto__ = fn.prototype;
  let res = fn.apply(obj, args);
  return res instanceof Object ? res : obj;
};
const call = function(fn, ...args) {
  let callTemp = Symbol();
  fn[callTemp] = this;
  let res = fn[callTemp](...args);
  fn[callTemp] = null;
  return res;
};
const apply = function(fn, args) {
  let callTemp = Symbol();
  fn[callTemp] = this;
  let res = fn[callTemp](...args);
  fn[callTemp] = null;
  return res;
};
const bind = function(fn, ...args) {
  let self = this;
  return function(...args2) {
    return self.apply(fn,[...args,...args2]);
  };
};

// 构造寄生式
function parent(name) {
  this.name = name
}
function sub(name, age) {
  parent.call(this, name);
  this.age = age;
}

let F = function () { }
F.prototype = parent.prototype;
sub.prototype = new F();

sub.prototype.constructor = sub;

// class 实现原理
let father = new parent();
sub.call(father)
father.prototype = sub.prototype;
father.__proto__ = parent;
father.prototype.__proto__ = parent.prototype;
