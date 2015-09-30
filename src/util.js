export const assign = Object.assign;

export const each = function(collection, fn) {
  if(collection.length) {
    Array.from(collection).forEach(function(value, index, arr) {
      fn(value, index, arr);
    });
  }else {
    for(let key in collection) {
      fn(collection[key], key, collection);
    }
  }
};

export const isEmptyObject = function(obj) {
  return Object.keys(obj).length == 0;
};

export const isArray = function(arr) {
  return type(arr) == 'array';
};

export const isFunction = function(fn) {
  return type(fn) == 'function';
};

export const isObject = function(obj) {
  return type(obj) == 'object';
};

export const isSet = function(obj) {
  return type(obj) == 'set';
};

const type = function(obj) {
  return {}.toString.call(obj).slice(8, -1).toLowerCase();
};