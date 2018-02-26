module objects {
    export class Hero extends objects.GameObject {

        private _movingDirection :core.MovingDirections;
        private _physics :core.GamePhysics;
        private _forceN: number = 1;
        private _weightN: number;

        constructor(assetManager: createjs.LoadQueue, weightN: number) {
            super(assetManager, "sonicHero");
            this._physics = new core.GamePhysics();
            this._weightN = weightN;
            this.Start();

        }

        public Start(): void {
            this.y = 430;
            let deltaMeasurer = new core.TimeDeltaMeasurer();
            deltaMeasurer.maxDelta = 40;
            deltaMeasurer.start();


        }

        public Update():void {
            this.Move();
            this.CheckBounds();
        }

        public Move():void {
            if(objects.Game.keyboardManager.moveLeft) {
                this.x -= 5;
            }

            if(objects.Game.keyboardManager.moveRight) {
                this.x += 5;
            }

            if (objects.Game.keyboardManager.jumpForward) {
                this._physics.jump(this, 270 + 0.005);
            }

            if (objects.Game.keyboardManager.jumpBack) {
                this._physics.jump(this, 270 - 0.005 - 90);
            }


        }

        public CheckBounds():void {
            // right boundary
            if(this.x >= 640 - this.halfWidth) {
                this.x = 640 - this.halfWidth;
            }

            // left boundary
            if(this.x <= this.halfWidth) {
                this.x = this.halfWidth;
            }
        }

        public get movingDirection(): core.MovingDirections {
            return this._movingDirection;
        }

        public set movingDirection(value: core.MovingDirections) {
            this._movingDirection = value;
        }

        public get forceN(): number {
            return this._forceN;
        }

        public set forceN(value: number) {
            this._forceN = value;
        }
    }
}