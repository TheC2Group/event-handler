/*!
 * c2-event-handler
 * https://github.com/TheC2Group/event-handler
 * @version 2.3.2
 * @license MIT (c) The C2 Group (c2experience.com)
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.eventHandler = factory();
}(this, function () { 'use strict';

    var babelHelpers = {};

    babelHelpers.typeof = function (obj) {
      return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
    };

    babelHelpers;
    var on = function on(event, fn) {
        if (typeof event !== 'string' || !event.length || typeof fn === 'undefined') return;

        if (event.indexOf(' ') > -1) {
            event.split(' ').forEach(function (eventName) {
                on.call(this, eventName, fn);
            }, this);
            return;
        }

        this._events = this._events || {};
        this._events[event] = this._events[event] || [];
        this._events[event].push(fn);
    };

    var off = function off(event, fn) {
        if (typeof event !== 'string' || !event.length) return;

        if (event.indexOf(' ') > -1) {
            event.split(' ').forEach(function (eventName) {
                off.call(this, eventName, fn);
            }, this);
            return;
        }

        this._events = this._events || {};

        if (event in this._events === false) return;

        if (typeof fn === 'undefined') {
            delete this._events[event];
            return;
        }

        var index = this._events[event].indexOf(fn);
        if (index > -1) {
            if (this._events[event].length === 1) {
                delete this._events[event];
            } else {
                this._events[event].splice(index, 1);
            }
        }
    };

    var emit = function emit(event /* , args... */) {
        var args = Array.prototype.slice.call(arguments, 1);

        var lastIndex = event.lastIndexOf(':');
        if (lastIndex > -1) {
            emit.apply(this, [event.substring(0, lastIndex)].concat(args));
        }

        this._events = this._events || {};

        if (event in this._events === false) return;

        this._events[event].forEach(function (fn) {
            fn.apply(this, args);
        }, this);
    };

    var EventConstructor = function EventConstructor() {};

    var proto = EventConstructor.prototype;
    proto.on = on;
    proto.off = off;
    proto.emit = emit;

    // legacy extensions
    proto.bind = on;
    proto.unbind = off;
    proto.trigger = emit;

    var handler = function handler(_class) {

        // constructor
        if (arguments.length === 0) {
            return new EventConstructor();
        }

        // mixin
        if (typeof _class === 'function') {
            _class.prototype.on = on;
            _class.prototype.off = off;
            _class.prototype.emit = emit;
        }

        if ((typeof _class === 'undefined' ? 'undefined' : babelHelpers.typeof(_class)) === 'object') {
            _class.on = on;
            _class.off = off;
            _class.emit = emit;
        }

        return _class;
    };

    return handler;

}));