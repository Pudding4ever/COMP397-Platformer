module core {
    export class TimeDeltaMeasurer {

        private _prev :number;
        private _next :number;
        private _maxDelta :number;

        public start():void {
            this._next = new Date().getMilliseconds();
        }

        public calculateDelta() :number {
            this._prev = this._next;
            this._next = new Date().getMilliseconds();
            return this._next - this._prev;
        }

        public stop() :void {
            this._prev = 0;
            this._next = 0;
        }

        public set maxDelta(value: number) {
            this._maxDelta = value;
        }

        public get maxDelta(): number {
            return this._maxDelta;
        }


    }
}