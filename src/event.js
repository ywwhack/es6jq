import {_data, removeData} from './data';
import {assign, isEmptyObject, isFunction, isObject} from './util';

export const on = function(types, selector, data, fn, one) {
  if(isFunction(selector)) {
    fn = selector;
    selector = data = undefined;
  }else if(typeof selector == 'string') {
    if(isFunction(data)) {
      fn = data;
      data = undefined;
    }
  }else if(isObject(selector)) {
    fn = data;
    data = selector;
    selector = undefined;
  }
  types = types.split(' ');
  types.forEach((type) => {
    this.each(function(elem) {
      add(elem, type, fn, data, selector);
    });
  });

  return this;
};

export const off = function(types) {
  if(types === undefined) {
    this.each((elem) => {
      removeData(elem, 'events handle');
    });
  }
  types = types.split(' ');
  types.forEach((type) => {
    this.each((elem) => {
      remove(elem, type);
    });
  });

  return this;
};

export const add = function(elem, type, handler, data, selector) {
  let events = _data(elem, 'events') || _data(elem, 'events', {});
  let handle = _data(elem, 'handle');
  let handlers = events[type];
  let handlerObj = assign({customData: data || {}}, {handler});

  if(!handle) {
    handle = _data(elem, 'handle', eventHandler);
  }
  if(!handlers) {
    handlers = events[type] = [];
    handlers.delegateCount = 0;
    elem.addEventListener(type, eventHandler, false);
  }
  if(selector) {
    assign(handlerObj, {selector});
    handlers.splice(handlers.delegateCount++, 0, handlerObj);
  }else {
    handlers.push(handlerObj);
  }

  function eventHandler(ev) {
    handlers.forEach((handlerObj) => {
      assign(handlerObj, {origalEvent: ev});
    });
    dispatch.call(elem, elem, ev.type);
  }
};

export const remove = function(elem, type) {
  let events = _data(elem, 'events');
  let handle = _data(elem, 'handle');
  delete events[type];
  elem.removeEventListener(type, handle);
  if(isEmptyObject(events)) {
    removeData(elem, ['events', 'handle'], true);
  }
};

export const dispatch = function(elem, type) {
  let events = _data(elem, 'events');
  let handlers = events[type];
  let delegateCount = handlers.delegateCount;

  for(let i=0; i<delegateCount; i++) {
    let handlerObj = handlers[i];
    let selector = handlerObj.selector;
    for(let cur=handlerObj.origalEvent.target ; cur!=this; cur=cur.parentNode) {
      if(cur.nodeName.toLowerCase() == selector) {
        handlerObj.handler.call(cur, generatorEvent(handlerObj, i));
      }
    }
  }
  for(let i=delegateCount, len=handlers.length; i<len; i++) {
    let handlerObj = handlers[i];
    handlerObj.handler.call(elem, generatorEvent(handlerObj, i));
  }
};

export const trigger = function(elem, type, data) {
  let ev = new Event(type, {bubbles: true, cancelable: true});
  assign(ev, data);
  elem.dispatchEvent(ev);
};

const generatorEvent = function(handlerObj) {
  let ev = handlerObj.origalEvent;
  let customData = handlerObj.customData;
  if(ev.customData) {
    for(let attr in ev.customData) {
      delete ev[attr];
    }
  }
  for(let attr in customData) {
    ev[attr] = customData[attr];
  }
  ev.customData = customData;
  return ev;
};