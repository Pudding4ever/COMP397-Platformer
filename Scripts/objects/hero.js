var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var Hero = /** @class */ (function (_super) {
        __extends(Hero, _super);
        function Hero(assetManager, weightN) {
            var _this = _super.call(this, assetManager, "sonicHero") || this;
            _this._forceN = 1;
            _this._physics = new core.GamePhysics();
            _this._weightN = weightN;
            _this._previousX = _this.x;
            _this._previousY = _this.y;
            _this.Start();
            return _this;
        }
        Hero.prototype.Start = function () {
            this.y = 480 - this.halfHeight;
            var deltaMeasurer = new core.TimeDeltaMeasurer();
            deltaMeasurer.maxDelta = 40;
            deltaMeasurer.start();
        };
        Hero.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
            this._dx = this.x - this._previousX;
            this._dy = this.y - this._previousY;
            this._previousX = this.x;
            this._previousY = this.y;
        };
        Hero.prototype.Move = function () {
            if (objects.Game.keyboardManager.moveLeft) {
                this.x -= 5;
            }
            if (objects.Game.keyboardManager.moveRight) {
                this.x += 5;
            }
            if (objects.Game.keyboardManager.jumpForward) {
                this._physics.jump(this, 270 + 0.005);
            }
            if (objects.Game.keyboardManager.jumpBack) {
                this.fireBullet();
            }
        };
        Hero.prototype.fireBullet = function () {
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
        };
        Hero.prototype.jumpDown = function () {
            if (this._dx > 0) {
                this._physics.jump(this, 270 - 19, 5);
            }
            else {
                this._physics.jump(this, 270 + 30, 5);
            }
        };
        Hero.prototype.isOnGround = function () {
            return !(this._physics.checkX(this) && this._physics.checkY(this));
        };
        Hero.prototype.stopHero = function () {
            this._physics.stopJumping();
        };
        Hero.prototype.isFalling = function () {
            return this._dy > 0;
        };
        Hero.prototype.CheckBounds = function () {
            // right boundary
            if (this.x >= 640 - this.halfWidth) {
                this.x = 640 - this.halfWidth;
            }
            // left boundary
            if (this.x <= this.halfWidth) {
                this.x = this.halfWidth;
            }
        };
        Object.defineProperty(Hero.prototype, "movingDirection", {
            get: function () {
                return this._movingDirection;
            },
            set: function (value) {
                this._movingDirection = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Hero.prototype, "forceN", {
            get: function () {
                return this._forceN;
            },
            set: function (value) {
                this._forceN = value;
            },
            enumerable: true,
            configurable: true
        });
        return Hero;
    }(objects.GameObject));
    objects.Hero = Hero;
})(objects || (objects = {}));
//# sourceMappingURL=hero.js.map