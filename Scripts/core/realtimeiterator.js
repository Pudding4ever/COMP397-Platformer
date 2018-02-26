var core;
(function (core) {
    var RealtimeIterator = /** @class */ (function () {
        function RealtimeIterator() {
            this._isStarted = false;
            this._previous = 0;
            this._next = 0;
        }
        RealtimeIterator.prototype.startIteration = function () {
            this._isStarted = true;
            this._previous = new Date().getSeconds();
            return 0;
        };
        Object.defineProperty(RealtimeIterator.prototype, "previous", {
            get: function () {
                if (!this._isStarted) {
                    return -1;
                }
                if (this._previous > this._next) {
                    return 0;
                }
                return this._previous;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RealtimeIterator.prototype, "next", {
            get: function () {
                if (!this._isStarted) {
                    return -1;
                }
                else {
                    this._previous = this._next;
                    this._next = new Date().getSeconds() - this._previous;
                    return this._next;
                }
            },
            enumerable: true,
            configurable: true
        });
        RealtimeIterator.prototype.stopIteration = function () {
            this._isStarted = false;
            this._previous = 0;
            this._next = 0;
        };
        Object.defineProperty(RealtimeIterator.prototype, "isStarted", {
            get: function () {
                return this._isStarted;
            },
            enumerable: true,
            configurable: true
        });
        return RealtimeIterator;
    }());
    core.RealtimeIterator = RealtimeIterator;
})(core || (core = {}));
//# sourceMappingURL=realtimeiterator.js.map