/**
 * event-handler - make any constructor an event emitter
 * https://bitbucket.org/c2group/event-handler
 * @preserve
 */

var EventHandler = (function () {
    'use strict';

    var on = function (event, fn) {
        this._events = this._events || {};
        this._events[event] = this._events[event] || [];
        this._events[event].push(fn);
    };

    var off = function (event, fn) {
        this._events = this._events || {};
        if (event in this._events === false) return;
        if (typeof fn === 'undefined') {
            delete this._events[event];
            return;
        }
        var index = this._events[event].indexOf(fn);
        if (index > -1) {
            this._events[event].splice(index, 1);
        }
    };

    var emit = function (event /* , args... */) {
        this._events = this._events || {};
        if (event in this._events === false) return;
        for (var i = 0; i < this._events[event].length; i++) {
            this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    };

    var Emitter = function (_class) {
        // mixin
        if (typeof _class === 'function') {
            _class.prototype.on = on;
            _class.prototype.off = off;
            _class.prototype.emit = emit;
        }
    };

    var proto = Emitter.prototype;

    proto.on = on;
    proto.bind = on;
    proto.off = off;
    proto.unbind = off;
    proto.emit = emit;
    proto.trigger = emit;

    return Emitter;
}());

// export commonjs
if (typeof module !== 'undefined' && ('exports' in module)) {
    module.exports = EventHandler;
}
