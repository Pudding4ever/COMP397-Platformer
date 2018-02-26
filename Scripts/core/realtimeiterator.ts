module core {
    export class RealtimeIterator {

        private _isStarted :boolean = false;
        private _previous :number = 0;
        private _next :number = 0;

        public startIteration() :number {
            this._isStarted = true;
            this._previous = new Date().getSeconds();
            return 0;
        }

        public get previous(): number {
            if (!this._isStarted) {
                return -1;
            }
            if (this._previous > this._next) {
                return 0;
            }
            return this._previous;
        }

        public get next(): number {
            if (!this._isStarted) {
                return -1;
            }
            else {
                this._previous = this._next;
                this._next = new Date().getSeconds() - this._previous;
                return this._next;
            }
        }

        public stopIteration() :void {
            this._isStarted = false;
            this._previous  = 0;
            this._next = 0;
        }

        public get isStarted(): boolean {
            return this._isStarted;
        }
    }
}