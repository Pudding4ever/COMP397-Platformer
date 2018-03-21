var core;
(function (core) {
    var GamePhysics = /** @class */ (function () {
        function GamePhysics() {
            this.isJumpng = false;
            this.timeIterator = new core.RealtimeIterator();
        }
        GamePhysics.prototype.jump = function (hero, alfa, Pt) {
            if (Pt === void 0) { Pt = 14; }
            var i = 0;
            var gf = this;
            var h = hero;
            var startX = h.x;
            var startY = h.y;
            if (!this.isJumpng) {
                this.isJumpng = true;
                //Horizontal jump movement is cool and realistic but not good for platformer so I removed. Cool idea for a more realistic game though.
                this._onY = createjs.Ticker.on("tick", function () {
                    h.y = startY - gf.calculateY(Pt, alfa, ++i / 10);
                    if (!gf.checkY(h)) {
                        createjs.Ticker.off("tick", this._onY);
                        createjs.Ticker.off("tick", this._onX);
                        gf.isJumpng = false;
                    }
                }, this);
            }
        };
        GamePhysics.prototype.stopJumping = function () {
            createjs.Ticker.off("tick", this._onY);
            createjs.Ticker.off("tick", this._onX);
            this.isJumpng = false;
        };
        GamePhysics.prototype.calculateX = function (Pt, alfa, ti) {
            return this.V0(Pt, GamePhysics.g) * ti * Math.cos(alfa * 180 / Math.PI);
        };
        GamePhysics.prototype.calculateY = function (Pt, alfa, ti) {
            return this.V0(Pt, GamePhysics.g) * ti * Math.sin(alfa * 180 / Math.PI) - GamePhysics.g * ti * ti * 0.5;
        };
        GamePhysics.prototype.V0 = function (Pt, g) {
            return 0.5 * Pt * g;
        };
        GamePhysics.prototype.checkX = function (hero) {
            if (hero.x >= 640 - hero.halfWidth) {
                hero.x = 640 - hero.halfWidth;
                return false;
            }
            // left boundary
            if (hero.x <= hero.halfWidth) {
                hero.x = hero.halfWidth;
                return false;
            }
            return true;
        };
        GamePhysics.prototype.checkY = function (hero) {
            if (hero.y >= 480 - hero.halfHeight) {
                hero.y = 480 - hero.halfHeight;
                return false;
            }
            // left boundary
            if (hero.y <= hero.halfHeight) {
                hero.y = hero.halfHeight;
                return false;
            }
            return true;
        };
        GamePhysics.g = 9.81;
        return GamePhysics;
    }());
    core.GamePhysics = GamePhysics;
})(core || (core = {}));
//# sourceMappingURL=gamephysics.js.map