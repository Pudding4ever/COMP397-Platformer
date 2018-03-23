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
var scenes;
(function (scenes) {
    var PlayScene = /** @class */ (function (_super) {
        __extends(PlayScene, _super);
        // Public Properties
        // Constructor
        function PlayScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        // Public Methods
        // TODO: Initialize Game Variables and objects
        PlayScene.prototype.Start = function () {
            this.collisionmanager = new managers.Collision();
            this._sonic = new objects.Hero(this.assetManager, 1 * 10);
            this._sonic.myScene = this;
            this._platform = new objects.Platform(this.assetManager);
            this._badguy = new objects.Enemy(this.assetManager);
            this.bulletobjectpool = new Array();
            for (var i = 0; i < 12; i++) {
                var b;
                b = new objects.Bullet(this.assetManager);
                this.bulletobjectpool.push(b);
                this.addChild(b);
                console.log("created bullet");
            }
            this.Main();
        };
        //TODO: Call update of game objects
        PlayScene.prototype.Update = function () {
            this._sonic.Update();
            this.checkBullets();
            this._badguy.Update();
            if (this.isOn(this._platform) && this._sonic.isFalling()) {
                this._sonic.stopHero();
                this.placeOn(this._platform, this._sonic);
            }
            if (!this.isOn(this._platform) && !this._sonic.isOnGround()) {
                this._sonic.jumpDown();
            }
        };
        PlayScene.prototype.checkBullets = function () {
            var b;
            for (b in this.bulletobjectpool) {
                this.bulletobjectpool[b].Update();
                this.collisionmanager.Check(this.bulletobjectpool[b], this._badguy);
            }
        };
        //TODO: Add Game objects to the scene
        PlayScene.prototype.Main = function () {
            this.addChild(this._sonic);
            this.addChild(this._platform);
            this.addChild(this._badguy);
        };
        PlayScene.prototype.isOn = function (platform) {
            var x = this._sonic.x;
            var y = this._sonic.y;
            return (x + this._sonic.width / 2 >= platform.x - platform.width / 2 && x - this._sonic.width / 2 <= platform.x + platform.width / 2) &&
                (y >= platform.y - platform.height / 2 - this._sonic.height / 2);
        };
        PlayScene.prototype.placeOn = function (platform, hero) {
            hero.y = platform.y - platform.height / 2 - hero.height / 2;
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map