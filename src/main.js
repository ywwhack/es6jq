import $ from './dollar';
import Jquery from './jquery';
import {assign, each, isSet} from './util';
import {async} from './async';
import {add, dispatch, trigger, remove, on, off} from './event';
import {data, removeData} from './data';
import {} from './traversing';
import {} from './maniputation';

$.event = {};

assign($, {each});
assign($, {async});
assign($.event, {add, dispatch, trigger, remove});

assign(Jquery.prototype,
  {
    each(fn) {
      each(this, fn);
      return this;
    }
  },
  {
    data(attr, value) {
      return this.each(elem => {
        data(elem, attr, value);
      });
    },
    removeData(attr) {
      return this.each(elem => {
        removeData(elem, attr);
      });
    }
  },
  {
    on, off
  }
);

window.$ = $;