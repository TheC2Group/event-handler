event-handler
=============

Create an event emitter by either creating a new object or mixin in an existing object or constructor.

```js
// fresh emitter object
var emitter = eventHandler();
```

```js
var obj = {};

// mixin existing object
eventHandler(obj);
```

```js
var Constructor = function () {};

// mixin existing constructor
eventHandler(Constructor);
```

Once you've created the emitter, use the methods to turn `on` or `off` functions or to `emit` events.

```js
obj.on('start stop', function (status) {
    console.log('the program has ' + status);
});

obj.off('stop');

obj.emit('start', 'started'); // the program has started
```


Test
----

```
$ npm install -g mocha
$ mocha
```


License
-------

MIT © [The C2 Group](https://c2experience.com)
