var core;
(function (core) {
    var TimeDeltaMeasurer = /** @class */ (function () {
        function TimeDeltaMeasurer() {
        }
        TimeDeltaMeasurer.prototype.start = function () {
            this._next = new Date().getMilliseconds();
        };
        TimeDeltaMeasurer.prototype.calculateDelta = function () {
            this._prev = this._next;
            this._next = new Date().getMilliseconds();
            return this._next - this._prev;
        };
        TimeDeltaMeasurer.prototype.stop = function () {
            this._prev = 0;
            this._next = 0;
        };
        Object.defineProperty(TimeDeltaMeasurer.prototype, "maxDelta", {
            get: function () {
                return this._maxDelta;
            },
            set: function (value) {
                this._maxDelta = value;
            },
            enumerable: true,
            configurable: true
        });
        return TimeDeltaMeasurer;
    }());
    core.TimeDeltaMeasurer = TimeDeltaMeasurer;
})(core || (core = {}));
//# sourceMappingURL=timedeltameasurer.js.map