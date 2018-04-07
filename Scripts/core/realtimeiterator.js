var core;
(function (core) {
    class RealtimeIterator {
        constructor() {
            this._isStarted = false;
            this._previous = 0;
            this._next = 0;
        }
        startIteration() {
            this._isStarted = true;
            this._previous = new Date().getSeconds();
            return 0;
        }
        get previous() {
            if (!this._isStarted) {
                return -1;
            }
            if (this._previous > this._next) {
                return 0;
            }
            return this._previous;
        }
        get next() {
            if (!this._isStarted) {
                return -1;
            }
            else {
                this._previous = this._next;
                this._next = new Date().getSeconds() - this._previous;
                return this._next;
            }
        }
        stopIteration() {
            this._isStarted = false;
            this._previous = 0;
            this._next = 0;
        }
        get isStarted() {
            return this._isStarted;
        }
    }
    core.RealtimeIterator = RealtimeIterator;
})(core || (core = {}));
//# sourceMappingURL=realtimeiterator.js.map