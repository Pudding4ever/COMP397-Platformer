module objects {
    export class Hero extends objects.GameObject {

//BUG: Player teleports to top of platform if player moves under platform before touching the ground.

        private _movingDirection :core.MovingDirections;
        private _physics :core.GamePhysics;
        private _forceN: number = 1;
        private _weightN: number;
        private _previousX: number;
        private _previousY: number;

        public myScene: objects.Scene;


        constructor(assetManager: createjs.LoadQueue, weightN: number) {
            super(assetManager, "sonicHero");
            this._physics = new core.GamePhysics();
            this._weightN = weightN;
            this._previousX = this.x;
            this._previousY = this.y;
            this.Start();
        }

        public Start(): void {
            this.y = 480 - this.halfHeight;
            let deltaMeasurer = new core.TimeDeltaMeasurer();
            deltaMeasurer.maxDelta = 40;
            deltaMeasurer.start();
        }

        public Update():void {
            this.Move();
            this.CheckBounds();
            this._dx = this.x - this._previousX;
            this._dy = this.y - this._previousY;
            this._previousX = this.x;
            this._previousY = this.y;
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
                this.fireBullet();
            }
        }

        public fireBullet():void{
    var b = new objects.Bullet(this.myScene.assetManager);
    b.x = this.x;
    b.y = this.y;
        }

        public jumpDown():void {
            if(this._dx > 0) {
                this._physics.jump(this, 270 - 19, 5);
            } else {
                this._physics.jump(this, 270 + 30, 5);
            }
        }

        public isOnGround():boolean {
            return !(this._physics.checkX(this) && this._physics.checkY(this));
        }

        public stopHero():void {
            this._physics.stopJumping();
        }

        public isFalling():boolean {
            return this._dy > 0;
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