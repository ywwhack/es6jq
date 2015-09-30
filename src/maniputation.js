import Jquery from './jquery';
import $ from './dollar';
import {each, assign} from './util';

export const append = function() {
  return domManip.call(this, Array.from(arguments), function (fragment) {
    this.appendChild(fragment);
  });
};

const domManip = function(args, callback) {
  let fragment = clean(args);
  each(this, (elem, index) => {
    callback.call(elem, index==this.length-1 ? fragment : clone(fragment));
  });
  return this;
};

const clone = function(fragment) {
  let cloneFragment = document.createDocumentFragment();

  Array.from(fragment.childNodes).forEach((childNode) => {
    console.log(childNode);
    cloneFragment.appendChild(childNode.cloneNode(true));
  });

  return cloneFragment;
};

const clean = function(htmlArr) {
  let fragment = document.createDocumentFragment();
  let div = document.createElement('div');

  htmlArr.forEach((html) => {
    if(html.nodeType) {
      fragment.appendChild(html);
    }else {
      div.innerHTML = html;
      fragment.appendChild(div.firstChild);
    }
  });
  div = null;

  return fragment;
};

assign(Jquery.prototype, {append});
each({appendTo: append}, (fn, name) => {
  Jquery.prototype[name] = function(target) {
    target = target.nodeType ? [target] : target;
    fn.call(Array.from(target), ...this);
    return this;
  };
});