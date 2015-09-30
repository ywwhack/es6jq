import {isSet} from './util';

export default function(selector) {
  if( selector.nodeName ) {
    this[0] = selector;
    this.length = 1;
  }else if( isSet(selector) ) {
    let i = 0;
    selector.forEach((elem) => {
      this[i++] = elem;
    });
    this.length = i;
  }else {
    let elems = document.querySelectorAll(selector);

    for (let i = 0, len = elems.length; i < len; i++) {
      this[i] = elems[i];
    }

    this.length = elems.length;
  }
};
