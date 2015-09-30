/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _dollar = __webpack_require__(1);

	var _dollar2 = _interopRequireDefault(_dollar);

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _util = __webpack_require__(3);

	var _async = __webpack_require__(4);

	var _event = __webpack_require__(5);

	var _data2 = __webpack_require__(6);

	__webpack_require__(7);

	__webpack_require__(8);

	_dollar2['default'].event = {};

	(0, _util.assign)(_dollar2['default'], { each: _util.each });
	(0, _util.assign)(_dollar2['default'], { async: _async.async });
	(0, _util.assign)(_dollar2['default'].event, { add: _event.add, dispatch: _event.dispatch, trigger: _event.trigger, remove: _event.remove });

	(0, _util.assign)(_jquery2['default'].prototype, {
	  each: function each(fn) {
	    (0, _util.each)(this, fn);
	    return this;
	  }
	}, {
	  data: function data(attr, value) {
	    return this.each(function (elem) {
	      (0, _data2.data)(elem, attr, value);
	    });
	  },
	  removeData: function removeData(attr) {
	    return this.each(function (elem) {
	      (0, _data2.removeData)(elem, attr);
	    });
	  }
	}, {
	  on: _event.on, off: _event.off
	});

	window.$ = _dollar2['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	exports['default'] = function (selector) {
	  return new _jquery2['default'](selector);
	};

	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _util = __webpack_require__(3);

	exports['default'] = function (selector) {
	  var _this = this;

	  if (selector.nodeName) {
	    this[0] = selector;
	    this.length = 1;
	  } else if ((0, _util.isSet)(selector)) {
	    (function () {
	      var i = 0;
	      selector.forEach(function (elem) {
	        _this[i++] = elem;
	      });
	      _this.length = i;
	    })();
	  } else {
	    var elems = document.querySelectorAll(selector);

	    for (var i = 0, len = elems.length; i < len; i++) {
	      this[i] = elems[i];
	    }

	    this.length = elems.length;
	  }
	};

	;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var assign = Object.assign;

	exports.assign = assign;
	var each = function each(collection, fn) {
	  if (collection.length) {
	    Array.from(collection).forEach(function (value, index, arr) {
	      fn(value, index, arr);
	    });
	  } else {
	    for (var key in collection) {
	      fn(collection[key], key, collection);
	    }
	  }
	};

	exports.each = each;
	var isEmptyObject = function isEmptyObject(obj) {
	  return Object.keys(obj).length == 0;
	};

	exports.isEmptyObject = isEmptyObject;
	var isArray = function isArray(arr) {
	  return type(arr) == 'array';
	};

	exports.isArray = isArray;
	var isFunction = function isFunction(fn) {
	  return type(fn) == 'function';
	};

	exports.isFunction = isFunction;
	var isObject = function isObject(obj) {
	  return type(obj) == 'object';
	};

	exports.isObject = isObject;
	var isSet = function isSet(obj) {
	  return type(obj) == 'set';
	};

	exports.isSet = isSet;
	var type = function type(obj) {
	  return ({}).toString.call(obj).slice(8, -1).toLowerCase();
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var async = function async(gen) {

	  var it = gen();

	  onFulfill();

	  function onFulfill(res) {
	    var ret = undefined;
	    try {
	      ret = it.next(res);
	    } catch (e) {
	      reject(e);
	    }
	    next(ret);
	  }

	  function onReject(res) {
	    var ret = undefined;
	    try {
	      ret = it["throw"](err);
	    } catch (e) {
	      return reject(e);
	    }
	    next(ret);
	  }

	  function next(ret) {
	    if (!ret.done) return ret.value.then(onFulfill, onReject);;
	  }
	};
	exports.async = async;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _data2 = __webpack_require__(6);

	var _util = __webpack_require__(3);

	var on = function on(types, selector, data, fn, one) {
	  var _this = this;

	  if ((0, _util.isFunction)(selector)) {
	    fn = selector;
	    selector = data = undefined;
	  } else if (typeof selector == 'string') {
	    if ((0, _util.isFunction)(data)) {
	      fn = data;
	      data = undefined;
	    }
	  } else if ((0, _util.isObject)(selector)) {
	    fn = data;
	    data = selector;
	    selector = undefined;
	  }
	  types = types.split(' ');
	  types.forEach(function (type) {
	    _this.each(function (elem) {
	      add(elem, type, fn, data, selector);
	    });
	  });

	  return this;
	};

	exports.on = on;
	var off = function off(types) {
	  var _this2 = this;

	  if (types === undefined) {
	    this.each(function (elem) {
	      (0, _data2.removeData)(elem, 'events handle');
	    });
	  }
	  types = types.split(' ');
	  types.forEach(function (type) {
	    _this2.each(function (elem) {
	      remove(elem, type);
	    });
	  });

	  return this;
	};

	exports.off = off;
	var add = function add(elem, type, handler, data, selector) {
	  var events = (0, _data2._data)(elem, 'events') || (0, _data2._data)(elem, 'events', {});
	  var handle = (0, _data2._data)(elem, 'handle');
	  var handlers = events[type];
	  var handlerObj = (0, _util.assign)({ customData: data || {} }, { handler: handler });

	  if (!handle) {
	    handle = (0, _data2._data)(elem, 'handle', eventHandler);
	  }
	  if (!handlers) {
	    handlers = events[type] = [];
	    handlers.delegateCount = 0;
	    elem.addEventListener(type, eventHandler, false);
	  }
	  if (selector) {
	    (0, _util.assign)(handlerObj, { selector: selector });
	    handlers.splice(handlers.delegateCount++, 0, handlerObj);
	  } else {
	    handlers.push(handlerObj);
	  }

	  function eventHandler(ev) {
	    handlers.forEach(function (handlerObj) {
	      (0, _util.assign)(handlerObj, { origalEvent: ev });
	    });
	    dispatch.call(elem, elem, ev.type);
	  }
	};

	exports.add = add;
	var remove = function remove(elem, type) {
	  var events = (0, _data2._data)(elem, 'events');
	  var handle = (0, _data2._data)(elem, 'handle');
	  delete events[type];
	  elem.removeEventListener(type, handle);
	  if ((0, _util.isEmptyObject)(events)) {
	    (0, _data2.removeData)(elem, ['events', 'handle'], true);
	  }
	};

	exports.remove = remove;
	var dispatch = function dispatch(elem, type) {
	  var events = (0, _data2._data)(elem, 'events');
	  var handlers = events[type];
	  var delegateCount = handlers.delegateCount;

	  for (var i = 0; i < delegateCount; i++) {
	    var handlerObj = handlers[i];
	    var selector = handlerObj.selector;
	    for (var cur = handlerObj.origalEvent.target; cur != this; cur = cur.parentNode) {
	      if (cur.nodeName.toLowerCase() == selector) {
	        handlerObj.handler.call(cur, generatorEvent(handlerObj, i));
	      }
	    }
	  }
	  for (var i = delegateCount, len = handlers.length; i < len; i++) {
	    var handlerObj = handlers[i];
	    handlerObj.handler.call(elem, generatorEvent(handlerObj, i));
	  }
	};

	exports.dispatch = dispatch;
	var trigger = function trigger(elem, type, data) {
	  var ev = new Event(type, { bubbles: true, cancelable: true });
	  (0, _util.assign)(ev, data);
	  elem.dispatchEvent(ev);
	};

	exports.trigger = trigger;
	var generatorEvent = function generatorEvent(handlerObj) {
	  var ev = handlerObj.origalEvent;
	  var customData = handlerObj.customData;
	  if (ev.customData) {
	    for (var attr in ev.customData) {
	      delete ev[attr];
	    }
	  }
	  for (var attr in customData) {
	    ev[attr] = customData[attr];
	  }
	  ev.customData = customData;
	  return ev;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _util = __webpack_require__(3);

	var EXPANDO = 'es6jq';

	exports.EXPANDO = EXPANDO;
	var data = function data(elem, attr, value, pvt) {
	  var cache = elem[EXPANDO];
	  var thisCache = undefined;

	  if (pvt) {
	    thisCache = cache || (elem[EXPANDO] = {});
	  } else {
	    cache = cache ? cache : elem[EXPANDO] = {};
	    thisCache = "data" in cache ? cache.data : cache.data = {};
	  }

	  if (typeof attr == 'object') {
	    (0, _util.each)(attr, function (value, attr) {
	      data(elem, attr, value, pvt);
	    });
	  }

	  if (value) {
	    thisCache[attr] = value;
	  }
	  return thisCache[attr];
	};

	exports.data = data;
	var _data = function _data(elem, attr, value) {
	  return data(elem, attr, value, true);
	};

	exports._data = _data;
	var removeData = function removeData(elem, attr, pvt) {
	  var cache = elem[EXPANDO];
	  var thisCache = undefined;
	  if (pvt) {
	    if (!cache) {
	      return;
	    }
	    thisCache = cache;
	  } else {
	    if (!cache.data) {
	      return;
	    }
	    thisCache = cache.data;
	  }
	  if (typeof attr == 'string') {
	    delete thisCache[attr];
	  }
	  if ((0, _util.isArray)(attr)) {
	    (0, _util.each)(attr, function (value) {
	      removeData(elem, value, pvt);
	    });
	  }
	  if (cache.data && (0, _util.isEmptyObject)(cache.data)) {
	    delete cache.data;
	  }
	  if ((0, _util.isEmptyObject)(cache)) {
	    delete elem[EXPANDO];
	  }
	};
	exports.removeData = removeData;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _dollar = __webpack_require__(1);

	var _dollar2 = _interopRequireDefault(_dollar);

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _util = __webpack_require__(3);

	var parent = function parent(elem) {
	  var parent = elem.parentNode;
	  return parent && parent.nodeValue != 11 ? parent : null;
	};

	var parents = function parents(elem) {
	  return dir(elem, 'parentNode');
	};

	function dir(elem, dir) {
	  var ret = [],
	      cur = elem[dir];
	  for (; cur; cur = cur[dir]) {
	    ret.push(cur);
	  }
	  return ret;
	};

	(0, _util.each)({ parent: parent, parents: parents }, function (fn, name) {
	  _jquery2['default'].prototype[name] = function () {
	    var ret = Array.from(this).reduce(function (total, elem) {
	      var elems = fn(elem);
	      if ((0, _util.isArray)(elems)) {
	        elems.forEach(function (elem) {
	          total.add(elem);
	        });
	      } else {
	        total.add(elems);
	      }
	      return total;
	    }, new Set());

	    return (0, _dollar2['default'])(ret);
	  };
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _dollar = __webpack_require__(1);

	var _dollar2 = _interopRequireDefault(_dollar);

	var _util = __webpack_require__(3);

	var append = function append() {
	  return domManip.call(this, Array.from(arguments), function (fragment) {
	    this.appendChild(fragment);
	  });
	};

	exports.append = append;
	var domManip = function domManip(args, callback) {
	  var _this = this;

	  var fragment = clean(args);
	  (0, _util.each)(this, function (elem, index) {
	    callback.call(elem, index == _this.length - 1 ? fragment : clone(fragment));
	  });
	  return this;
	};

	var clone = function clone(fragment) {
	  var cloneFragment = document.createDocumentFragment();

	  Array.from(fragment.childNodes).forEach(function (childNode) {
	    console.log(childNode);
	    cloneFragment.appendChild(childNode.cloneNode(true));
	  });

	  return cloneFragment;
	};

	var clean = function clean(htmlArr) {
	  var fragment = document.createDocumentFragment();
	  var div = document.createElement('div');

	  htmlArr.forEach(function (html) {
	    if (html.nodeType) {
	      fragment.appendChild(html);
	    } else {
	      div.innerHTML = html;
	      fragment.appendChild(div.firstChild);
	    }
	  });
	  div = null;

	  return fragment;
	};

	(0, _util.assign)(_jquery2['default'].prototype, { append: append });
	(0, _util.each)({ appendTo: append }, function (fn, name) {
	  _jquery2['default'].prototype[name] = function (target) {
	    target = target.nodeType ? [target] : target;
	    fn.call.apply(fn, [Array.from(target)].concat(_toConsumableArray(this)));
	    return this;
	  };
	});

/***/ }
/******/ ]);