event-handler
=============

**A lightweight event emitter.**  
This began as a fork of [microevent.js](https://github.com/jeromeetienne/microevent.js).

## Example

First we define a class that will emit events. This is a ticker, it is triggering 'tick' event every second, and adds the current date as a parameter.

```js
var Ticker = function () {
    var self = this;
    setInterval(function () {
        self.emit('tick', new Date());
    }, 1000);
};
```

We mixin _EventHandler_ into _Ticker_ and we are all set.

```
EventHandler(Ticker);
```

Now lets actually use the _Ticker_ Class. First, create the instance.

```js
var ticker = new Ticker();
```

Bind our _tick_ event with its data parameter.

```js
ticker.on('tick', function (date) {
    console.log('notified date', date);
});
```

And you will see this output:

```
notified date Tue, 22 Mar 2011 14:43:41 GMT
notified date Tue, 22 Mar 2011 14:43:42 GMT
...
```
