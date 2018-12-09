// Почему this._i не увеличивается. Как исправить?

function Ticker() {
this._i = 0
};
Ticker.prototype = {
tick: function() {
console.log(this._i++);
}
};
var ticker = new Ticker();
setInterval(ticker.tick, 1000);

// this._i е увеличивается, потому что при вызове setInterval было потеряно окружение, и this будет в момент вызова равно глобальному объекту 
// можно использовать .bind

setInterval(ticker.tick.bind(ticker), 1000);

// или стрелочные функции

etInterval(() => ticker.tick(), 1000);