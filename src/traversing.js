import $ from './dollar';
import Jquery from './jquery';
import {each, isArray} from './util';

const parent = function(elem) {
  let parent = elem.parentNode;
  return parent && parent.nodeValue != 11 ? parent : null;
};

const parents = function(elem) {
  return dir(elem, 'parentNode');
};

function dir(elem, dir) {
  let ret = [], cur = elem[dir];
  for(;cur; cur=cur[dir]) {
    ret.push(cur);
  }
  return ret;
};

each({parent, parents}, (fn, name) => {
  Jquery.prototype[name] = function() {
    let ret = Array.from(this).reduce((total, elem) => {
      let elems = fn(elem);
      if( isArray(elems) ) {
        elems.forEach((elem) => {
          total.add(elem);
        });
      }else {
        total.add(elems);
      }
      return total;
    }, new Set());

    return $(ret);
  };
});

