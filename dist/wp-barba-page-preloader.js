/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WPBarba = __webpack_require__(1);

var _WPBarba2 = _interopRequireDefault(_WPBarba);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initBarba = function initBarba(props) {
  var wpBarba = new _WPBarba2.default(props);
  wpBarba.run();
};

exports.default = initBarba;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _barba = __webpack_require__(2);

var _barba2 = _interopRequireDefault(_barba);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WPBarba = function () {
  _createClass(WPBarba, null, [{
    key: 'handleActiveCSSClass',
    value: function handleActiveCSSClass(link) {
      if (link.href === location.href) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  }, {
    key: 'deactivateWpAdminLinks',
    value: function deactivateWpAdminLinks() {
      [].concat(_toConsumableArray(document.querySelectorAll('a[href*="/wp-"]'))).forEach(function (link) {
        link.classList.add('no-barba');
      });
    }
  }, {
    key: 'resetScroll',
    value: function resetScroll() {
      return new Promise(function (resolve) {
        scroll(0, 0);
        setTimeout(resolve, 25);
      });
    }
  }]);

  function WPBarba(_ref) {
    var _ref$pageloadFunction = _ref.pageloadFunctions,
        pageloadFunctions = _ref$pageloadFunction === undefined ? [] : _ref$pageloadFunction,
        _ref$wrapperId = _ref.wrapperId,
        wrapperId = _ref$wrapperId === undefined ? 'main-wrapper' : _ref$wrapperId,
        _ref$containerClass = _ref.containerClass,
        containerClass = _ref$containerClass === undefined ? 'main' : _ref$containerClass,
        navLinkSelector = _ref.navLinkSelector;

    _classCallCheck(this, WPBarba);

    this.handlePageload = this.handlePageload.bind(this);
    this.setActivePage = this.setActivePage.bind(this);

    this.pageloadFunctions = [WPBarba.deactivateWpAdminLinks].concat(pageloadFunctions).concat([this.setActivePage]);
    this.navLinkSelector = navLinkSelector;
    this.wrapperId = wrapperId;
    this.containerClass = containerClass;
  }

  _createClass(WPBarba, [{
    key: 'run',
    value: function run() {
      this.handlePageload();

      _barba2.default.Prefetch.init();
      _barba2.default.Pjax.Dom.wrapperId = this.wrapperId;
      _barba2.default.Pjax.Dom.containerClass = this.containerClass;
      _barba2.default.Pjax.start();

      this.runPageLoadListeners();
    }
  }, {
    key: 'handlePageload',
    value: function handlePageload() {
      this.pageloadFunctions.forEach(function (func) {
        func();
      });
    }
  }, {
    key: 'runPageLoadListeners',
    value: function runPageLoadListeners() {
      var _this = this;

      _barba2.default.Dispatcher.on('newPageReady', function () {
        WPBarba.deactivateWpAdminLinks();
        WPBarba.resetScroll().then(_this.handlePageload);
      });
    }
  }, {
    key: 'setActivePage',
    value: function setActivePage() {
      if (this.navLinkSelector) {
        this.pageLinks = this.pageLinks || document.querySelectorAll(this.navLinkSelector);

        [].concat(_toConsumableArray(this.pageLinks)).forEach(WPBarba.handleActiveCSSClass);
      }
    }
  }]);

  return WPBarba;
}();

exports.default = WPBarba;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function webpackUniversalModuleDefinition(root, factory) {
	if (( false ? 'undefined' : _typeof(exports)) === 'object' && ( false ? 'undefined' : _typeof(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') exports["Barba"] = factory();else root["Barba"] = factory();
})(undefined, function () {
	return (/******/function (modules) {
			// webpackBootstrap
			/******/ // The module cache
			/******/var installedModules = {};
			/******/
			/******/ // The require function
			/******/function __webpack_require__(moduleId) {
				/******/
				/******/ // Check if module is in cache
				/******/if (installedModules[moduleId])
					/******/return installedModules[moduleId].exports;
				/******/
				/******/ // Create a new module (and put it into the cache)
				/******/var module = installedModules[moduleId] = {
					/******/exports: {},
					/******/id: moduleId,
					/******/loaded: false
					/******/ };
				/******/
				/******/ // Execute the module function
				/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
				/******/
				/******/ // Flag the module as loaded
				/******/module.loaded = true;
				/******/
				/******/ // Return the exports of the module
				/******/return module.exports;
				/******/
			}
			/******/
			/******/
			/******/ // expose the modules object (__webpack_modules__)
			/******/__webpack_require__.m = modules;
			/******/
			/******/ // expose the module cache
			/******/__webpack_require__.c = installedModules;
			/******/
			/******/ // __webpack_public_path__
			/******/__webpack_require__.p = "http://localhost:8080/dist";
			/******/
			/******/ // Load entry module and return exports
			/******/return __webpack_require__(0);
			/******/
		}(
		/************************************************************************/
		/******/[
		/* 0 */
		/***/function (module, exports, __webpack_require__) {

			//Promise polyfill https://github.com/taylorhakes/promise-polyfill

			if (typeof Promise !== 'function') {
				window.Promise = __webpack_require__(1);
			}

			var Barba = {
				version: '1.0.0',
				BaseTransition: __webpack_require__(4),
				BaseView: __webpack_require__(6),
				BaseCache: __webpack_require__(8),
				Dispatcher: __webpack_require__(7),
				HistoryManager: __webpack_require__(9),
				Pjax: __webpack_require__(10),
				Prefetch: __webpack_require__(13),
				Utils: __webpack_require__(5)
			};

			module.exports = Barba;

			/***/
		},
		/* 1 */
		/***/function (module, exports, __webpack_require__) {

			/* WEBPACK VAR INJECTION */(function (setImmediate) {
				(function (root) {

					// Store setTimeout reference so promise-polyfill will be unaffected by
					// other code modifying setTimeout (like sinon.useFakeTimers())
					var setTimeoutFunc = setTimeout;

					function noop() {}

					// Use polyfill for setImmediate for performance gains
					var asap = typeof setImmediate === 'function' && setImmediate || function (fn) {
						setTimeoutFunc(fn, 0);
					};

					var onUnhandledRejection = function onUnhandledRejection(err) {
						if (typeof console !== 'undefined' && console) {
							console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
						}
					};

					// Polyfill for Function.prototype.bind
					function bind(fn, thisArg) {
						return function () {
							fn.apply(thisArg, arguments);
						};
					}

					function Promise(fn) {
						if (_typeof(this) !== 'object') throw new TypeError('Promises must be constructed via new');
						if (typeof fn !== 'function') throw new TypeError('not a function');
						this._state = 0;
						this._handled = false;
						this._value = undefined;
						this._deferreds = [];

						doResolve(fn, this);
					}

					function handle(self, deferred) {
						while (self._state === 3) {
							self = self._value;
						}
						if (self._state === 0) {
							self._deferreds.push(deferred);
							return;
						}
						self._handled = true;
						asap(function () {
							var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
							if (cb === null) {
								(self._state === 1 ? resolve : reject)(deferred.promise, self._value);
								return;
							}
							var ret;
							try {
								ret = cb(self._value);
							} catch (e) {
								reject(deferred.promise, e);
								return;
							}
							resolve(deferred.promise, ret);
						});
					}

					function resolve(self, newValue) {
						try {
							// Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
							if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
							if (newValue && ((typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object' || typeof newValue === 'function')) {
								var then = newValue.then;
								if (newValue instanceof Promise) {
									self._state = 3;
									self._value = newValue;
									finale(self);
									return;
								} else if (typeof then === 'function') {
									doResolve(bind(then, newValue), self);
									return;
								}
							}
							self._state = 1;
							self._value = newValue;
							finale(self);
						} catch (e) {
							reject(self, e);
						}
					}

					function reject(self, newValue) {
						self._state = 2;
						self._value = newValue;
						finale(self);
					}

					function finale(self) {
						if (self._state === 2 && self._deferreds.length === 0) {
							asap(function () {
								if (!self._handled) {
									onUnhandledRejection(self._value);
								}
							});
						}

						for (var i = 0, len = self._deferreds.length; i < len; i++) {
							handle(self, self._deferreds[i]);
						}
						self._deferreds = null;
					}

					function Handler(onFulfilled, onRejected, promise) {
						this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
						this.onRejected = typeof onRejected === 'function' ? onRejected : null;
						this.promise = promise;
					}

					/**
      * Take a potentially misbehaving resolver function and make sure
      * onFulfilled and onRejected are only called once.
      *
      * Makes no guarantees about asynchrony.
      */
					function doResolve(fn, self) {
						var done = false;
						try {
							fn(function (value) {
								if (done) return;
								done = true;
								resolve(self, value);
							}, function (reason) {
								if (done) return;
								done = true;
								reject(self, reason);
							});
						} catch (ex) {
							if (done) return;
							done = true;
							reject(self, ex);
						}
					}

					Promise.prototype['catch'] = function (onRejected) {
						return this.then(null, onRejected);
					};

					Promise.prototype.then = function (onFulfilled, onRejected) {
						var prom = new this.constructor(noop);

						handle(this, new Handler(onFulfilled, onRejected, prom));
						return prom;
					};

					Promise.all = function (arr) {
						var args = Array.prototype.slice.call(arr);

						return new Promise(function (resolve, reject) {
							if (args.length === 0) return resolve([]);
							var remaining = args.length;

							function res(i, val) {
								try {
									if (val && ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' || typeof val === 'function')) {
										var then = val.then;
										if (typeof then === 'function') {
											then.call(val, function (val) {
												res(i, val);
											}, reject);
											return;
										}
									}
									args[i] = val;
									if (--remaining === 0) {
										resolve(args);
									}
								} catch (ex) {
									reject(ex);
								}
							}

							for (var i = 0; i < args.length; i++) {
								res(i, args[i]);
							}
						});
					};

					Promise.resolve = function (value) {
						if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Promise) {
							return value;
						}

						return new Promise(function (resolve) {
							resolve(value);
						});
					};

					Promise.reject = function (value) {
						return new Promise(function (resolve, reject) {
							reject(value);
						});
					};

					Promise.race = function (values) {
						return new Promise(function (resolve, reject) {
							for (var i = 0, len = values.length; i < len; i++) {
								values[i].then(resolve, reject);
							}
						});
					};

					/**
      * Set the immediate function to execute callbacks
      * @param fn {function} Function to execute
      * @private
      */
					Promise._setImmediateFn = function _setImmediateFn(fn) {
						asap = fn;
					};

					Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
						onUnhandledRejection = fn;
					};

					if (typeof module !== 'undefined' && module.exports) {
						module.exports = Promise;
					} else if (!root.Promise) {
						root.Promise = Promise;
					}
				})(this);

				/* WEBPACK VAR INJECTION */
			}).call(exports, __webpack_require__(2).setImmediate);

			/***/
		},
		/* 2 */
		/***/function (module, exports, __webpack_require__) {

			/* WEBPACK VAR INJECTION */(function (setImmediate, clearImmediate) {
				var nextTick = __webpack_require__(3).nextTick;
				var apply = Function.prototype.apply;
				var slice = Array.prototype.slice;
				var immediateIds = {};
				var nextImmediateId = 0;

				// DOM APIs, for completeness

				exports.setTimeout = function () {
					return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
				};
				exports.setInterval = function () {
					return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
				};
				exports.clearTimeout = exports.clearInterval = function (timeout) {
					timeout.close();
				};

				function Timeout(id, clearFn) {
					this._id = id;
					this._clearFn = clearFn;
				}
				Timeout.prototype.unref = Timeout.prototype.ref = function () {};
				Timeout.prototype.close = function () {
					this._clearFn.call(window, this._id);
				};

				// Does not start the time, just sets up the members needed.
				exports.enroll = function (item, msecs) {
					clearTimeout(item._idleTimeoutId);
					item._idleTimeout = msecs;
				};

				exports.unenroll = function (item) {
					clearTimeout(item._idleTimeoutId);
					item._idleTimeout = -1;
				};

				exports._unrefActive = exports.active = function (item) {
					clearTimeout(item._idleTimeoutId);

					var msecs = item._idleTimeout;
					if (msecs >= 0) {
						item._idleTimeoutId = setTimeout(function onTimeout() {
							if (item._onTimeout) item._onTimeout();
						}, msecs);
					}
				};

				// That's not how node.js implements it but the exposed api is the same.
				exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function (fn) {
					var id = nextImmediateId++;
					var args = arguments.length < 2 ? false : slice.call(arguments, 1);

					immediateIds[id] = true;

					nextTick(function onNextTick() {
						if (immediateIds[id]) {
							// fn.call() is faster so we optimize for the common use-case
							// @see http://jsperf.com/call-apply-segu
							if (args) {
								fn.apply(null, args);
							} else {
								fn.call(null);
							}
							// Prevent ids from leaking
							exports.clearImmediate(id);
						}
					});

					return id;
				};

				exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function (id) {
					delete immediateIds[id];
				};
				/* WEBPACK VAR INJECTION */
			}).call(exports, __webpack_require__(2).setImmediate, __webpack_require__(2).clearImmediate);

			/***/
		},
		/* 3 */
		/***/function (module, exports) {

			// shim for using process in browser

			var process = module.exports = {};

			// cached from whatever global is present so that test runners that stub it
			// don't break things.  But we need to wrap it in a try catch in case it is
			// wrapped in strict mode code which doesn't define any globals.  It's inside a
			// function because try/catches deoptimize in certain engines.

			var cachedSetTimeout;
			var cachedClearTimeout;

			(function () {
				try {
					cachedSetTimeout = setTimeout;
				} catch (e) {
					cachedSetTimeout = function cachedSetTimeout() {
						throw new Error('setTimeout is not defined');
					};
				}
				try {
					cachedClearTimeout = clearTimeout;
				} catch (e) {
					cachedClearTimeout = function cachedClearTimeout() {
						throw new Error('clearTimeout is not defined');
					};
				}
			})();
			var queue = [];
			var draining = false;
			var currentQueue;
			var queueIndex = -1;

			function cleanUpNextTick() {
				if (!draining || !currentQueue) {
					return;
				}
				draining = false;
				if (currentQueue.length) {
					queue = currentQueue.concat(queue);
				} else {
					queueIndex = -1;
				}
				if (queue.length) {
					drainQueue();
				}
			}

			function drainQueue() {
				if (draining) {
					return;
				}
				var timeout = cachedSetTimeout(cleanUpNextTick);
				draining = true;

				var len = queue.length;
				while (len) {
					currentQueue = queue;
					queue = [];
					while (++queueIndex < len) {
						if (currentQueue) {
							currentQueue[queueIndex].run();
						}
					}
					queueIndex = -1;
					len = queue.length;
				}
				currentQueue = null;
				draining = false;
				cachedClearTimeout(timeout);
			}

			process.nextTick = function (fun) {
				var args = new Array(arguments.length - 1);
				if (arguments.length > 1) {
					for (var i = 1; i < arguments.length; i++) {
						args[i - 1] = arguments[i];
					}
				}
				queue.push(new Item(fun, args));
				if (queue.length === 1 && !draining) {
					cachedSetTimeout(drainQueue, 0);
				}
			};

			// v8 likes predictible objects
			function Item(fun, array) {
				this.fun = fun;
				this.array = array;
			}
			Item.prototype.run = function () {
				this.fun.apply(null, this.array);
			};
			process.title = 'browser';
			process.browser = true;
			process.env = {};
			process.argv = [];
			process.version = ''; // empty string to avoid regexp issues
			process.versions = {};

			function noop() {}

			process.on = noop;
			process.addListener = noop;
			process.once = noop;
			process.off = noop;
			process.removeListener = noop;
			process.removeAllListeners = noop;
			process.emit = noop;

			process.binding = function (name) {
				throw new Error('process.binding is not supported');
			};

			process.cwd = function () {
				return '/';
			};
			process.chdir = function (dir) {
				throw new Error('process.chdir is not supported');
			};
			process.umask = function () {
				return 0;
			};

			/***/
		},
		/* 4 */
		/***/function (module, exports, __webpack_require__) {

			var Utils = __webpack_require__(5);

			/**
    * BaseTransition to extend
    *
    * @namespace Barba.BaseTransition
    * @type {Object}
    */
			var BaseTransition = {
				/**
     * @memberOf Barba.BaseTransition
     * @type {HTMLElement}
     */
				oldContainer: undefined,

				/**
     * @memberOf Barba.BaseTransition
     * @type {HTMLElement}
     */
				newContainer: undefined,

				/**
     * @memberOf Barba.BaseTransition
     * @type {Promise}
     */
				newContainerLoading: undefined,

				/**
     * Helper to extend the object
     *
     * @memberOf Barba.BaseTransition
     * @param  {Object} newObject
     * @return {Object} newInheritObject
     */
				extend: function extend(obj) {
					return Utils.extend(this, obj);
				},

				/**
     * This function is called from Pjax module to initialize
     * the transition.
     *
     * @memberOf Barba.BaseTransition
     * @private
     * @param  {HTMLElement} oldContainer
     * @param  {Promise} newContainer
     * @return {Promise}
     */
				init: function init(oldContainer, newContainer) {
					var _this = this;

					this.oldContainer = oldContainer;
					this._newContainerPromise = newContainer;

					this.deferred = Utils.deferred();
					this.newContainerReady = Utils.deferred();
					this.newContainerLoading = this.newContainerReady.promise;

					this.start();

					this._newContainerPromise.then(function (newContainer) {
						_this.newContainer = newContainer;
						_this.newContainerReady.resolve();
					});

					return this.deferred.promise;
				},

				/**
     * This function needs to be called as soon the Transition is finished
     *
     * @memberOf Barba.BaseTransition
     */
				done: function done() {
					this.oldContainer.parentNode.removeChild(this.oldContainer);
					this.newContainer.style.visibility = 'visible';
					this.deferred.resolve();
				},

				/**
     * Constructor for your Transition
     *
     * @memberOf Barba.BaseTransition
     * @abstract
     */
				start: function start() {}
			};

			module.exports = BaseTransition;

			/***/
		},
		/* 5 */
		/***/function (module, exports) {

			/**
    * Just an object with some helpful functions
    *
    * @type {Object}
    * @namespace Barba.Utils
    */
			var Utils = {
				/**
     * Return the current url
     *
     * @memberOf Barba.Utils
     * @return {String} currentUrl
     */
				getCurrentUrl: function getCurrentUrl() {
					return window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search;
				},

				/**
     * Given an url, return it without the hash
     *
     * @memberOf Barba.Utils
     * @private
     * @param  {String} url
     * @return {String} newCleanUrl
     */
				cleanLink: function cleanLink(url) {
					return url.replace(/#.*/, '');
				},

				/**
     * Time in millisecond after the xhr request goes in timeout
     *
     * @memberOf Barba.Utils
     * @type {Number}
     * @default
     */
				xhrTimeout: 5000,

				/**
     * Start an XMLHttpRequest() and return a Promise
     *
     * @memberOf Barba.Utils
     * @param  {String} url
     * @return {Promise}
     */
				xhr: function xhr(url) {
					var deferred = this.deferred();
					var req = new XMLHttpRequest();

					req.onreadystatechange = function () {
						if (req.readyState === 4) {
							if (req.status === 200) {
								return deferred.resolve(req.responseText);
							} else {
								return deferred.reject(new Error('xhr: HTTP code is not 200'));
							}
						}
					};

					req.ontimeout = function () {
						return deferred.reject(new Error('xhr: Timeout exceeded'));
					};

					req.open('GET', url);
					req.timeout = this.xhrTimeout;
					req.setRequestHeader('x-barba', 'yes');
					req.send();

					return deferred.promise;
				},

				/**
     * Get obj and props and return a new object with the property merged
     *
     * @memberOf Barba.Utils
     * @param  {object} obj
     * @param  {object} props
     * @return {object}
     */
				extend: function extend(obj, props) {
					var newObj = Object.create(obj);

					for (var prop in props) {
						if (props.hasOwnProperty(prop)) {
							newObj[prop] = props[prop];
						}
					}

					return newObj;
				},

				/**
     * Return a new "Deferred" object
     * https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred
     *
     * @memberOf Barba.Utils
     * @return {Deferred}
     */
				deferred: function deferred() {
					return new function () {
						this.resolve = null;
						this.reject = null;

						this.promise = new Promise(function (resolve, reject) {
							this.resolve = resolve;
							this.reject = reject;
						}.bind(this));
					}();
				},

				/**
     * Return the port number normalized, eventually you can pass a string to be normalized.
     *
     * @memberOf Barba.Utils
     * @private
     * @param  {String} p
     * @return {Int} port
     */
				getPort: function getPort(p) {
					var port = typeof p !== 'undefined' ? p : window.location.port;
					var protocol = window.location.protocol;

					if (port != '') return parseInt(port);

					if (protocol === 'http:') return 80;

					if (protocol === 'https:') return 443;
				}
			};

			module.exports = Utils;

			/***/
		},
		/* 6 */
		/***/function (module, exports, __webpack_require__) {

			var Dispatcher = __webpack_require__(7);
			var Utils = __webpack_require__(5);

			/**
    * BaseView to be extended
    *
    * @namespace Barba.BaseView
    * @type {Object}
    */
			var BaseView = {
				/**
     * Namespace of the view.
     * (need to be associated with the data-namespace of the container)
     *
     * @memberOf Barba.BaseView
     * @type {String}
     */
				namespace: null,

				/**
     * Helper to extend the object
     *
     * @memberOf Barba.BaseView
     * @param  {Object} newObject
     * @return {Object} newInheritObject
     */
				extend: function extend(obj) {
					return Utils.extend(this, obj);
				},

				/**
     * Init the view.
     * P.S. Is suggested to init the view before starting Barba.Pjax.start(),
     * in this way .onEnter() and .onEnterCompleted() will be fired for the current
     * container when the page is loaded.
     *
     * @memberOf Barba.BaseView
     */
				init: function init() {
					var _this = this;

					Dispatcher.on('initStateChange', function (newStatus, oldStatus) {
						if (oldStatus && oldStatus.namespace === _this.namespace) _this.onLeave();
					});

					Dispatcher.on('newPageReady', function (newStatus, oldStatus, container) {
						_this.container = container;

						if (newStatus.namespace === _this.namespace) _this.onEnter();
					});

					Dispatcher.on('transitionCompleted', function (newStatus, oldStatus) {
						if (newStatus.namespace === _this.namespace) _this.onEnterCompleted();

						if (oldStatus && oldStatus.namespace === _this.namespace) _this.onLeaveCompleted();
					});
				},

				/**
     * This function will be fired when the container
     * is ready and attached to the DOM.
     *
     * @memberOf Barba.BaseView
     * @abstract
     */
				onEnter: function onEnter() {},

				/**
     * This function will be fired when the transition
     * to this container has just finished.
     *
     * @memberOf Barba.BaseView
     * @abstract
     */
				onEnterCompleted: function onEnterCompleted() {},

				/**
     * This function will be fired when the transition
     * to a new container has just started.
     *
     * @memberOf Barba.BaseView
     * @abstract
     */
				onLeave: function onLeave() {},

				/**
     * This function will be fired when the container
     * has just been removed from the DOM.
     *
     * @memberOf Barba.BaseView
     * @abstract
     */
				onLeaveCompleted: function onLeaveCompleted() {}
			};

			module.exports = BaseView;

			/***/
		},
		/* 7 */
		/***/function (module, exports) {

			/**
    * Little Dispatcher inspired by MicroEvent.js
    *
    * @namespace Barba.Dispatcher
    * @type {Object}
    */
			var Dispatcher = {
				/**
     * Object that keeps all the events
     *
     * @memberOf Barba.Dispatcher
     * @readOnly
     * @type {Object}
     */
				events: {},

				/**
     * Bind a callback to an event
     *
     * @memberOf Barba.Dispatcher
     * @param  {String} eventName
     * @param  {Function} function
     */
				on: function on(e, f) {
					this.events[e] = this.events[e] || [];
					this.events[e].push(f);
				},

				/**
     * Unbind event
     *
     * @memberOf Barba.Dispatcher
     * @param  {String} eventName
     * @param  {Function} function
     */
				off: function off(e, f) {
					if (e in this.events === false) return;

					this.events[e].splice(this.events[e].indexOf(f), 1);
				},

				/**
     * Fire the event running all the event associated to it
     *
     * @memberOf Barba.Dispatcher
     * @param  {String} eventName
     * @param  {...*} args
     */
				trigger: function trigger(e) {
					//e, ...args
					if (e in this.events === false) return;

					for (var i = 0; i < this.events[e].length; i++) {
						this.events[e][i].apply(this, Array.prototype.slice.call(arguments, 1));
					}
				}
			};

			module.exports = Dispatcher;

			/***/
		},
		/* 8 */
		/***/function (module, exports, __webpack_require__) {

			var Utils = __webpack_require__(5);

			/**
    * BaseCache it's a simple static cache
    *
    * @namespace Barba.BaseCache
    * @type {Object}
    */
			var BaseCache = {
				/**
     * The Object that keeps all the key value information
     *
     * @memberOf Barba.BaseCache
     * @type {Object}
     */
				data: {},

				/**
     * Helper to extend this object
     *
     * @memberOf Barba.BaseCache
     * @private
     * @param  {Object} newObject
     * @return {Object} newInheritObject
     */
				extend: function extend(obj) {
					return Utils.extend(this, obj);
				},

				/**
     * Set a key and value data, mainly Barba is going to save promises
     *
     * @memberOf Barba.BaseCache
     * @param {String} key
     * @param {*} value
     */
				set: function set(key, val) {
					this.data[key] = val;
				},

				/**
     * Retrieve the data using the key
     *
     * @memberOf Barba.BaseCache
     * @param  {String} key
     * @return {*}
     */
				get: function get(key) {
					return this.data[key];
				},

				/**
     * Flush the cache
     *
     * @memberOf Barba.BaseCache
     */
				reset: function reset() {
					this.data = {};
				}
			};

			module.exports = BaseCache;

			/***/
		},
		/* 9 */
		/***/function (module, exports) {

			/**
    * HistoryManager helps to keep track of the navigation
    *
    * @namespace Barba.HistoryManager
    * @type {Object}
    */
			var HistoryManager = {
				/**
     * Keep track of the status in historic order
     *
     * @memberOf Barba.HistoryManager
     * @readOnly
     * @type {Array}
     */
				history: [],

				/**
     * Add a new set of url and namespace
     *
     * @memberOf Barba.HistoryManager
     * @param {String} url
     * @param {String} namespace
     * @private
     */
				add: function add(url, namespace) {
					if (!namespace) namespace = undefined;

					this.history.push({
						url: url,
						namespace: namespace
					});
				},

				/**
     * Return information about the current status
     *
     * @memberOf Barba.HistoryManager
     * @return {Object}
     */
				currentStatus: function currentStatus() {
					return this.history[this.history.length - 1];
				},

				/**
     * Return information about the previous status
     *
     * @memberOf Barba.HistoryManager
     * @return {Object}
     */
				prevStatus: function prevStatus() {
					var history = this.history;

					if (history.length < 2) return null;

					return history[history.length - 2];
				}
			};

			module.exports = HistoryManager;

			/***/
		},
		/* 10 */
		/***/function (module, exports, __webpack_require__) {

			var Utils = __webpack_require__(5);
			var Dispatcher = __webpack_require__(7);
			var HideShowTransition = __webpack_require__(11);
			var BaseCache = __webpack_require__(8);

			var HistoryManager = __webpack_require__(9);
			var Dom = __webpack_require__(12);

			/**
    * Pjax is a static object with main function
    *
    * @namespace Barba.Pjax
    * @borrows Dom as Dom
    * @type {Object}
    */
			var Pjax = {
				Dom: Dom,
				History: HistoryManager,
				Cache: BaseCache,

				/**
     * Indicate wether or not use the cache
     *
     * @memberOf Barba.Pjax
     * @type {Boolean}
     * @default
     */
				cacheEnabled: true,

				/**
     * Indicate if there is an animation in progress
     *
     * @memberOf Barba.Pjax
     * @readOnly
     * @type {Boolean}
     */
				transitionProgress: false,

				/**
     * Class name used to ignore links
     *
     * @memberOf Barba.Pjax
     * @type {String}
     * @default
     */
				ignoreClassLink: 'no-barba',

				/**
     * Function to be called to start Pjax
     *
     * @memberOf Barba.Pjax
     */
				start: function start() {
					this.init();
				},

				/**
     * Init the events
     *
     * @memberOf Barba.Pjax
     * @private
     */
				init: function init() {
					var container = this.Dom.getContainer();
					var wrapper = this.Dom.getWrapper();

					wrapper.setAttribute('aria-live', 'polite');

					this.History.add(this.getCurrentUrl(), this.Dom.getNamespace(container));

					//Fire for the current view.
					Dispatcher.trigger('initStateChange', this.History.currentStatus());
					Dispatcher.trigger('newPageReady', this.History.currentStatus(), {}, container, this.Dom.currentHTML);
					Dispatcher.trigger('transitionCompleted', this.History.currentStatus());

					this.bindEvents();
				},

				/**
     * Attach the eventlisteners
     *
     * @memberOf Barba.Pjax
     * @private
     */
				bindEvents: function bindEvents() {
					document.addEventListener('click', this.onLinkClick.bind(this));

					window.addEventListener('popstate', this.onStateChange.bind(this));
				},

				/**
     * Return the currentURL cleaned
     *
     * @memberOf Barba.Pjax
     * @return {String} currentUrl
     */
				getCurrentUrl: function getCurrentUrl() {
					return Utils.cleanLink(Utils.getCurrentUrl());
				},

				/**
     * Change the URL with pushstate and trigger the state change
     *
     * @memberOf Barba.Pjax
     * @param {String} newUrl
     */
				goTo: function goTo(url) {
					window.history.pushState(null, null, url);
					this.onStateChange();
				},

				/**
     * Force the browser to go to a certain url
     *
     * @memberOf Barba.Pjax
     * @param {String} url
     * @private
     */
				forceGoTo: function forceGoTo(url) {
					window.location = url;
				},

				/**
     * Load an url, will start an xhr request or load from the cache
     *
     * @memberOf Barba.Pjax
     * @private
     * @param  {String} url
     * @return {Promise}
     */
				load: function load(url) {
					var deferred = Utils.deferred();
					var _this = this;
					var xhr;

					xhr = this.Cache.get(url);

					if (!xhr) {
						xhr = Utils.xhr(url);
						this.Cache.set(url, xhr);
					}

					xhr.then(function (data) {
						var container = _this.Dom.parseResponse(data);

						_this.Dom.putContainer(container);

						if (!_this.cacheEnabled) _this.Cache.reset();

						deferred.resolve(container);
					}, function () {
						//Something went wrong (timeout, 404, 505...)
						_this.forceGoTo(url);

						deferred.reject();
					});

					return deferred.promise;
				},

				/**
     * Get the .href parameter out of an element
     * and handle special cases (like xlink:href)
     *
     * @private
     * @memberOf Barba.Pjax
     * @param  {HTMLElement} el
     * @return {String} href
     */
				getHref: function getHref(el) {
					if (!el) {
						return undefined;
					}

					if (el.getAttribute && typeof el.getAttribute('xlink:href') === 'string') {
						return el.getAttribute('xlink:href');
					}

					if (typeof el.href === 'string') {
						return el.href;
					}

					return undefined;
				},

				/**
     * Callback called from click event
     *
     * @memberOf Barba.Pjax
     * @private
     * @param {MouseEvent} evt
     */
				onLinkClick: function onLinkClick(evt) {
					var el = evt.target;

					//Go up in the nodelist until we
					//find something with an href
					while (el && !this.getHref(el)) {
						el = el.parentNode;
					}

					if (this.preventCheck(evt, el)) {
						evt.stopPropagation();
						evt.preventDefault();

						Dispatcher.trigger('linkClicked', el, evt);

						var href = this.getHref(el);
						this.goTo(href);
					}
				},

				/**
     * Determine if the link should be followed
     *
     * @memberOf Barba.Pjax
     * @param  {MouseEvent} evt
     * @param  {HTMLElement} element
     * @return {Boolean}
     */
				preventCheck: function preventCheck(evt, element) {
					if (!window.history.pushState) return false;

					var href = this.getHref(element);

					//User
					if (!element || !href) return false;

					//Middle click, cmd click, and ctrl click
					if (evt.which > 1 || evt.metaKey || evt.ctrlKey || evt.shiftKey || evt.altKey) return false;

					//Ignore target with _blank target
					if (element.target && element.target === '_blank') return false;

					//Check if it's the same domain
					if (window.location.protocol !== element.protocol || window.location.hostname !== element.hostname) return false;

					//Check if the port is the same
					if (Utils.getPort() !== Utils.getPort(element.port)) return false;

					//Ignore case when a hash is being tacked on the current URL
					if (href.indexOf('#') > -1) return false;

					//Ignore case where there is download attribute
					if (element.getAttribute && typeof element.getAttribute('download') === 'string') return false;

					//In case you're trying to load the same page
					if (Utils.cleanLink(href) == Utils.cleanLink(location.href)) return false;

					if (element.classList.contains(this.ignoreClassLink)) return false;

					return true;
				},

				/**
     * Return a transition object
     *
     * @memberOf Barba.Pjax
     * @return {Barba.Transition} Transition object
     */
				getTransition: function getTransition() {
					//User customizable
					return HideShowTransition;
				},

				/**
     * Method called after a 'popstate' or from .goTo()
     *
     * @memberOf Barba.Pjax
     * @private
     */
				onStateChange: function onStateChange() {
					var newUrl = this.getCurrentUrl();

					if (this.transitionProgress) this.forceGoTo(newUrl);

					if (this.History.currentStatus().url === newUrl) return false;

					this.History.add(newUrl);

					var newContainer = this.load(newUrl);
					var transition = Object.create(this.getTransition());

					this.transitionProgress = true;

					Dispatcher.trigger('initStateChange', this.History.currentStatus(), this.History.prevStatus());

					var transitionInstance = transition.init(this.Dom.getContainer(), newContainer);

					newContainer.then(this.onNewContainerLoaded.bind(this));

					transitionInstance.then(this.onTransitionEnd.bind(this));
				},

				/**
     * Function called as soon the new container is ready
     *
     * @memberOf Barba.Pjax
     * @private
     * @param {HTMLElement} container
     */
				onNewContainerLoaded: function onNewContainerLoaded(container) {
					var currentStatus = this.History.currentStatus();
					currentStatus.namespace = this.Dom.getNamespace(container);

					Dispatcher.trigger('newPageReady', this.History.currentStatus(), this.History.prevStatus(), container, this.Dom.currentHTML);
				},

				/**
     * Function called as soon the transition is finished
     *
     * @memberOf Barba.Pjax
     * @private
     */
				onTransitionEnd: function onTransitionEnd() {
					this.transitionProgress = false;

					Dispatcher.trigger('transitionCompleted', this.History.currentStatus(), this.History.prevStatus());
				}
			};

			module.exports = Pjax;

			/***/
		},
		/* 11 */
		/***/function (module, exports, __webpack_require__) {

			var BaseTransition = __webpack_require__(4);

			/**
    * Basic Transition object, wait for the new Container to be ready,
    * scroll top, and finish the transition (removing the old container and displaying the new one)
    *
    * @private
    * @namespace Barba.HideShowTransition
    * @augments Barba.BaseTransition
    */
			var HideShowTransition = BaseTransition.extend({
				start: function start() {
					this.newContainerLoading.then(this.finish.bind(this));
				},

				finish: function finish() {
					document.body.scrollTop = 0;
					this.done();
				}
			});

			module.exports = HideShowTransition;

			/***/
		},
		/* 12 */
		/***/function (module, exports) {

			/**
    * Object that is going to deal with DOM parsing/manipulation
    *
    * @namespace Barba.Pjax.Dom
    * @type {Object}
    */
			var Dom = {
				/**
     * The name of the data attribute on the container
     *
     * @memberOf Barba.Pjax.Dom
     * @type {String}
     * @default
     */
				dataNamespace: 'namespace',

				/**
     * Id of the main wrapper
     *
     * @memberOf Barba.Pjax.Dom
     * @type {String}
     * @default
     */
				wrapperId: 'barba-wrapper',

				/**
     * Class name used to identify the containers
     *
     * @memberOf Barba.Pjax.Dom
     * @type {String}
     * @default
     */
				containerClass: 'barba-container',

				/**
     * Full HTML String of the current page.
     * By default is the innerHTML of the initial loaded page.
     *
     * Each time a new page is loaded, the value is the response of the xhr call.
     *
     * @memberOf Barba.Pjax.Dom
     * @type {String}
     */
				currentHTML: document.documentElement.innerHTML,

				/**
     * Parse the responseText obtained from the xhr call
     *
     * @memberOf Barba.Pjax.Dom
     * @private
     * @param  {String} responseText
     * @return {HTMLElement}
     */
				parseResponse: function parseResponse(responseText) {
					this.currentHTML = responseText;

					var wrapper = document.createElement('div');
					wrapper.innerHTML = responseText;

					var titleEl = wrapper.querySelector('title');

					if (titleEl) document.title = titleEl.textContent;

					return this.getContainer(wrapper);
				},

				/**
     * Get the main barba wrapper by the ID `wrapperId`
     *
     * @memberOf Barba.Pjax.Dom
     * @return {HTMLElement} element
     */
				getWrapper: function getWrapper() {
					var wrapper = document.getElementById(this.wrapperId);

					if (!wrapper) throw new Error('Barba.js: wrapper not found!');

					return wrapper;
				},

				/**
     * Get the container on the current DOM,
     * or from an HTMLElement passed via argument
     *
     * @memberOf Barba.Pjax.Dom
     * @private
     * @param  {HTMLElement} element
     * @return {HTMLElement}
     */
				getContainer: function getContainer(element) {
					if (!element) element = document.body;

					if (!element) throw new Error('Barba.js: DOM not ready!');

					var container = this.parseContainer(element);

					if (container && container.jquery) container = container[0];

					if (!container) throw new Error('Barba.js: no container found');

					return container;
				},

				/**
     * Get the namespace of the container
     *
     * @memberOf Barba.Pjax.Dom
     * @private
     * @param  {HTMLElement} element
     * @return {String}
     */
				getNamespace: function getNamespace(element) {
					if (element && element.dataset) {
						return element.dataset[this.dataNamespace];
					} else if (element) {
						return element.getAttribute('data-' + this.dataNamespace);
					}

					return null;
				},

				/**
     * Put the container on the page
     *
     * @memberOf Barba.Pjax.Dom
     * @private
     * @param  {HTMLElement} element
     */
				putContainer: function putContainer(element) {
					element.style.visibility = 'hidden';

					var wrapper = this.getWrapper();
					wrapper.appendChild(element);
				},

				/**
     * Get container selector
     *
     * @memberOf Barba.Pjax.Dom
     * @private
     * @param  {HTMLElement} element
     * @return {HTMLElement} element
     */
				parseContainer: function parseContainer(element) {
					return element.querySelector('.' + this.containerClass);
				}
			};

			module.exports = Dom;

			/***/
		},
		/* 13 */
		/***/function (module, exports, __webpack_require__) {

			var Utils = __webpack_require__(5);
			var Pjax = __webpack_require__(10);

			/**
    * Prefetch
    *
    * @namespace Barba.Prefetch
    * @type {Object}
    */
			var Prefetch = {
				/**
     * Class name used to ignore prefetch on links
     *
     * @memberOf Barba.Prefetch
     * @type {String}
     * @default
     */
				ignoreClassLink: 'no-barba-prefetch',

				/**
     * Init the event listener on mouseover and touchstart
     * for the prefetch
     *
     * @memberOf Barba.Prefetch
     */
				init: function init() {
					if (!window.history.pushState) {
						return false;
					}

					document.body.addEventListener('mouseover', this.onLinkEnter.bind(this));
					document.body.addEventListener('touchstart', this.onLinkEnter.bind(this));
				},

				/**
     * Callback for the mousehover/touchstart
     *
     * @memberOf Barba.Prefetch
     * @private
     * @param  {Object} evt
     */
				onLinkEnter: function onLinkEnter(evt) {
					var el = evt.target;

					while (el && !Pjax.getHref(el)) {
						el = el.parentNode;
					}

					if (!el || el.classList.contains(this.ignoreClassLink)) {
						return;
					}

					var url = Pjax.getHref(el);

					//Check if the link is elegible for Pjax
					if (Pjax.preventCheck(evt, el) && !Pjax.Cache.get(url)) {
						var xhr = Utils.xhr(url);
						Pjax.Cache.set(url, xhr);
					}
				}
			};

			module.exports = Prefetch;

			/***/
		}
		/******/])
	);
});
;
//# sourceMappingURL=barba.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ })
/******/ ]);
//# sourceMappingURL=wp-barba-page-preloader.js.map