var core;
(function (core) {
    class TimeDeltaMeasurer {
        start() {
            this._next = new Date().getMilliseconds();
        }
        calculateDelta() {
            this._prev = this._next;
            this._next = new Date().getMilliseconds();
            return this._next - this._prev;
        }
        stop() {
            this._prev = 0;
            this._next = 0;
        }
        set maxDelta(value) {
            this._maxDelta = value;
        }
        get maxDelta() {
            return this._maxDelta;
        }
    }
    core.TimeDeltaMeasurer = TimeDeltaMeasurer;
})(core || (core = {}));
//# sourceMappingURL=timedeltameasurer.js.map