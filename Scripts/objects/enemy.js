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
    var Enemy = /** @class */ (function (_super) {
        __extends(Enemy, _super);
        function Enemy(assetManager) {
            var _this = _super.call(this, assetManager, "badguy") || this;
            _this.active = true;
            _this.timer = 0;
            _this.Start();
            return _this;
        }
        Enemy.prototype.Start = function () {
            var deltaMeasurer = new core.TimeDeltaMeasurer();
            deltaMeasurer.maxDelta = 40;
            deltaMeasurer.start();
            this.active == true;
            this.x = 530;
            this.y = 460;
            console.log(this.active);
        };
        Enemy.prototype.Update = function () {
            if (this.active == true) {
                this.alpha = 1;
                //run any AI here
            }
            if (this.isColliding == true) {
                console.log("enemy deactivated!");
                this.active = false;
                this.isColliding = false;
                this.alpha = 0;
            }
        };
        return Enemy;
    }(objects.GameObject));
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=enemy.js.map