import {each, isArray, isEmptyObject} from './util';

export const EXPANDO = 'es6jq';

export const data = function(elem, attr, value, pvt) {
  let cache = elem[EXPANDO];
  let thisCache;

  if(pvt) {
    thisCache = cache || (elem[EXPANDO] = {});
  }else {
    cache = cache ? cache : (elem[EXPANDO] = {});
    thisCache = "data" in cache ? cache.data : (cache.data = {});
  }

  if(typeof attr == 'object') {
    each(attr, function(value, attr) {
      data(elem, attr, value, pvt);
    });
  }

  if(value) {
    thisCache[attr] = value;
  }
  return thisCache[attr];
};

export const _data = function(elem, attr, value) {
  return data(elem, attr, value, true);
};

export const removeData = function(elem, attr, pvt) {
  let cache = elem[EXPANDO];
  let thisCache;
  if(pvt) {
    if(!cache) {
      return;
    }
    thisCache = cache;
  }else {
    if(!cache.data) {
      return;
    }
    thisCache = cache.data;
  }
  if(typeof attr == 'string') {
    delete thisCache[attr];
  }
  if(isArray(attr)) {
    each(attr, function(value) {
      removeData(elem, value, pvt);
    });
  }
  if(cache.data && isEmptyObject(cache.data)) {
    delete cache.data;
  }
  if(isEmptyObject(cache)) {
    delete elem[EXPANDO];
  }
};