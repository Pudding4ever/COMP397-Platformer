var core;
(function (core) {
    class GamePhysics {
        constructor() {
            this.isJumpng = false;
            this.timeIterator = new core.RealtimeIterator();
        }
        jump(hero, alfa, Pt = 12) {
            let i = 0;
            let gf = this;
            let h = hero;
            let startX = h.x;
            let startY = h.y;
            if (!this.isJumpng) {
                this.isJumpng = true;
                //Horizontal jump movement is cool and realistic but not good for platformer so I removed. Cool idea for a more realistic game though.
                //Ok, boss.
                //Need horizontal jump code back again for jumping enemy, grenade arc and dive-roll.
                /*
                 this._onX = createjs.Ticker.on("tick", function () {
                                    h.x = startX + gf.calculateX(Pt, alfa, ++i / 10);
                                    if (!gf.checkX(h)) {
                                        createjs.Ticker.off("tick", this._onX);
                                    }
                                }, this);
                */
                this._onY = createjs.Ticker.on("tick", function () {
                    h.y = startY - gf.calculateY(Pt, alfa, ++i / 10);
                    if (!gf.checkY(h)) {
                        createjs.Ticker.off("tick", this._onY);
                        gf.isJumpng = false;
                    }
                }, this);
            }
        }
        stopJumping() {
            createjs.Ticker.off("tick", this._onY);
            createjs.Ticker.off("tick", this._onX);
            this.isJumpng = false;
        }
        calculateX(Pt, alfa, ti) {
            return this.V0(Pt, GamePhysics.g) * ti * Math.cos(alfa * 180 / Math.PI);
        }
        calculateY(Pt, alfa, ti) {
            return this.V0(Pt, GamePhysics.g) * ti * Math.sin(alfa * 180 / Math.PI) - GamePhysics.g * ti * ti * 0.5;
        }
        V0(Pt, g) {
            return 0.5 * Pt * g;
        }
        checkX(hero) {
            if (hero.x >= 76400 - hero.halfWidth) {
                hero.x = 400 - hero.halfWidth;
                return false;
            }
            // left boundary
            if (hero.x <= hero.halfWidth) {
                hero.x = hero.halfWidth;
                return false;
            }
            return true;
        }
        checkY(hero) {
            if (hero.y >= 460 - hero.halfHeight) {
                hero.y = 460 - hero.halfHeight;
                return false;
            }
            // left boundary
            /* if(hero.y <= hero.halfHeight) {
                 hero.y = hero.halfHeight;
                 return false;
             }
             */
            return true;
        }
        enemyjump(jumper, alfa, Pt = 8) {
            Pt = Math.floor(Math.random() * 2) + 6;
            let i = 0;
            let gf = this;
            let h = jumper;
            let startX = h.x;
            let startY = h.y;
            if (!this.isJumpng) {
                this.isJumpng = true;
                //Horizontal jump movement is cool and realistic but not good for platformer so I removed. Cool idea for a more realistic game though.
                //Ok, boss.
                //Need horizontal jump code back again for jumping enemy, grenade arc and dive-roll.
                this._onX = createjs.Ticker.on("tick", function () {
                    h.x = startX + gf.calculateX(Pt, alfa, ++i / 10);
                    if (!gf.checkX(h)) {
                        createjs.Ticker.off("tick", this._onX);
                    }
                }, this);
                this._onY = createjs.Ticker.on("tick", function () {
                    h.y = startY - gf.calculateY(Pt, alfa, ++i / 10);
                    if (!gf.checkY(h)) {
                        createjs.Ticker.off("tick", this._onY);
                        gf.isJumpng = false;
                    }
                }, this);
            }
        }
        blankjump(jumper, alfa, Pt = 8) {
            Pt = 1;
            let i = 0;
            let gf = this;
            let h = jumper;
            let startX = h.x;
            let startY = h.y;
            if (!this.isJumpng) {
                this.isJumpng = true;
                //Horizontal jump movement is cool and realistic but not good for platformer so I removed. Cool idea for a more realistic game though.
                //Ok, boss.
                //Need horizontal jump code back again for jumping enemy, grenade arc and dive-roll.
                this._onX = createjs.Ticker.on("tick", function () {
                    h.x = startX + gf.calculateX(Pt, alfa, ++i / 10);
                    if (!gf.checkX(h)) {
                        createjs.Ticker.off("tick", this._onX);
                    }
                }, this);
                this._onY = createjs.Ticker.on("tick", function () {
                    h.y = startY - gf.calculateY(Pt, alfa, ++i / 10);
                    if (!gf.checkY(h)) {
                        createjs.Ticker.off("tick", this._onY);
                        gf.isJumpng = false;
                    }
                }, this);
            }
        }
    }
    GamePhysics.g = 9.81;
    core.GamePhysics = GamePhysics;
})(core || (core = {}));
//# sourceMappingURL=gamephysics.js.map