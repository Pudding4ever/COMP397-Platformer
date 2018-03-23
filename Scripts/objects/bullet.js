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
    var Bullet = /** @class */ (function (_super) {
        __extends(Bullet, _super);
        function Bullet(assetManager) {
            var _this = _super.call(this, assetManager, "bullet") || this;
            _this.active = false;
            _this.timer = 0;
            _this.Start();
            return _this;
        }
        Bullet.prototype.Start = function () {
            var deltaMeasurer = new core.TimeDeltaMeasurer();
            deltaMeasurer.maxDelta = 40;
            deltaMeasurer.start();
            this.active == false;
            console.log(this.active);
        };
        Bullet.prototype.Update = function () {
            if (this.active == true) {
                console.log("bullet active and travelling");
                this.alpha = 1;
                this.x = this.x + 3;
                this.timer++;
                if (this.timer > 240) {
                    console.log("bullet deactivated!");
                    this.active = false;
                    this.timer = 0;
                    this.alpha = 0;
                }
            }
        };
        return Bullet;
    }(objects.GameObject));
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=bullet.js.map