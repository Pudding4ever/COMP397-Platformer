var objects;
(function (objects) {
    class Hero extends objects.GameObject {
        constructor(assetManager, weightN) {
            super(assetManager, "sonicHero");
            this._forceN = 1;
            this._physics = new core.GamePhysics();
            this._weightN = weightN;
            this._previousX = this.x;
            this._previousY = this.y;
            this.Start();
        }
        Start() {
            this.y = 480 - this.halfHeight;
            let deltaMeasurer = new core.TimeDeltaMeasurer();
            deltaMeasurer.maxDelta = 40;
            deltaMeasurer.start();
        }
        Update() {
            this.Move();
            this.CheckBounds();
            this._dx = this.x - this._previousX;
            this._dy = this.y - this._previousY;
            this._previousX = this.x;
            this._previousY = this.y;
            //console.log (this.x, this.y);
        }
        Move() {
            if (objects.Game.keyboardManager.moveLeft) {
                this.x -= 5;
            }
            if (objects.Game.keyboardManager.moveRight) {
                //if (!this.isOnMiddle()) {
                this.x += 5;
                // }
            }
            if (objects.Game.keyboardManager.jumpForward) {
                this._physics.jump(this, 270 + 0.005);
            }
            if (objects.Game.keyboardManager.jumpBack) {
                this.fireBullet();
            }
        }
        fireBullet() {
            console.log("fire key pressed!");
            console.log(this.myScene.bulletobjectpool);
            var b;
            for (b in this.myScene.bulletobjectpool) {
                console.log("checking bullet object pool ", +b);
                console.log(this.myScene.bulletobjectpool[b].active);
                if (this.myScene.bulletobjectpool[b].active == false) {
                    console.log("activating bullet!");
                    this.myScene.bulletobjectpool[b].x = this.x;
                    this.myScene.bulletobjectpool[b].y = this.y;
                    this.myScene.bulletobjectpool[b].active = true;
                    console.log(this.myScene.bulletobjectpool[b].active);
                    break;
                }
            }
        }
        jumpDown() {
            if (this._dx > 0) {
                this._physics.jump(this, 270 - 19, 5);
            }
            else {
                this._physics.jump(this, 270 + 30, 5);
            }
        }
        isOnGround() {
            return !(this._physics.checkX(this) && this._physics.checkY(this));
        }
        stopHero() {
            this._physics.stopJumping();
        }
        isFalling() {
            return this._dy > 0;
        }
        isMovingForward() {
            return this._dx > 0;
        }
        CheckBounds() {
            // right boundary
            if (this.x >= 640 - this.halfWidth) {
                this.x = 640 - this.halfWidth;
            }
            // left boundary
            if (this.x <= this.halfWidth) {
                this.x = this.halfWidth;
            }
        }
        get movingDirection() {
            return this._movingDirection;
        }
        set movingDirection(value) {
            this._movingDirection = value;
        }
        get forceN() {
            return this._forceN;
        }
        set forceN(value) {
            this._forceN = value;
        }
        get dx() {
            return this._dx;
        }
        isOnMiddle() {
            return this.x > 640 / 2;
        }
        isOnLeftBorder() {
            return this.x <= this.halfWidth;
        }
    }
    objects.Hero = Hero;
})(objects || (objects = {}));
//# sourceMappingURL=hero.js.map